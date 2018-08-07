
import User from './../models/User';
import flash from 'connect-flash';
import paginate from 'express-paginate';
import { sendWelcomeEmail } from '../services/emailService';

import { check , validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";

import nodemailer from 'nodemailer';

import crypto from 'crypto';

const usersController = {}

usersController.signup = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const user = matchedData(req);
    return res.render('signup' , { errors : errors.mapped() , users : user})
  }else {
    try {
      const email = await User.findOne({email : req.body.email});
      if(email){
        return res.render('signup' , {users : req.body , emailError : 'Email is already registered.'})
      }
      const username = await User.findOne({username : req.body.username});
      if(username) {
        return res.render('signup' , {users : req.body , usernameError : 'Username is already registered.'})
      }
      let verificationCode = crypto.randomBytes(10).toString('hex');
      const newUser = new User(req.body);
      newUser.verificationCode = verificationCode;
      newUser.isVerified = false;
      
      const user = await newUser.save(); 
      sendWelcomeEmail(req.body.email , verificationCode);
      req.flash('success' , 'Please, Verify your email to continue.')
      
    }catch(error) {
      throw error;
      req.flash('error' , error.message)
    }    
    res.redirect('/admin/signin');
  }
}

usersController.signin = async (req, res) => {
  if(req.session.user) {
    return res.redirect('/')
  }
  // res.render('signin');
  res.render('pages/users/signin')
}

usersController.login = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const user = matchedData(req);
    return res.render('signin', { errors : errors.mapped() , users:user })
  }else {
    try {
      const user = await User.findOne({"username" : req.body.username});
      if( !user ){
        req.flash('error' , 'User doest not exist.')
      }else {
        const isMatch = await user.isValidPassword(req.body.password);
        if( !isMatch ){
          req.flash('error', 'Password doest not match.');
        }else {
          // if user is active then login else send link to activate.
          if(user.isVerified == false) {
            sendWelcomeEmail(user.email , user.verificationCode );
            req.flash('error' , 'Please check your email and activate your account.')
            return res.redirect('/admin/signin')
          }
          // password matched, set session and redirect.
          req.session.user = user;
          return res.redirect('/admin/dashboard')        
        }
      }
      res.redirect('/admin/signin')
    }catch( error){
      throw Error(error);
    }
  }
  }

  usersController.home = async(req, res) => {
    res.render('home')
  }

  usersController.logout = async(req, res) => {
     req.session.destroy((err) => {
     res.redirect('/admin/signin')
    });
  }

  usersController.verifyAccount = async(req, res) => {
    let { verificationCode } = req.params;
    let user = await User.findOneAndUpdate({ verificationCode : verificationCode } , {isVerified : true});
    if( user ) {
      req.flash('success', 'Account activated, You may login now.')
      res.redirect('/admin/signin')
    }else {
      req.flash('error', 'Invalid access.');
      res.redirect('/admin/signin')
    }
  }

  usersController.forgotPassword = async (req, res) => {
    res.render('forgotpassword')
  }

  usersController.updatePassword = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const user = matchedData(req);
      return res.render('forgotpassword' , {errors : errors.mapped() , users: user});
    }else {
      let username = req.body.username;
      let password = req.body.password;
      const user = await User.findOne({username});
      if( user ) {
        user.password = password;
        user.save();
        req.flash('success' , 'Password has been updated. Please, login to continue.');  
      }else {
        req.flash('error' , 'User doesnt exist.');
      }
      res.redirect('/forgotpassword')
    }
  }

  usersController.getAllUsers = async (req, res) => {
    const [ results , itemCount ] = await Promise.all([
      User.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
      User.count({})
    ])
    const pageCount = Math.ceil(itemCount / req.query.limit);
    res.render('pages/user/users', {
      users: results,
      pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
    });
  }

export default usersController;