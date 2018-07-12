
import User from './../models/User';
import flash from 'connect-flash';

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
      let verificationCode = crypto.randomBytes(10).toString('hex');
      const newUser = new User(req.body);
      newUser.verificationCode = verificationCode;
      newUser.isVerified = false;
      
      const user = await newUser.save(); 
      sendWelcomeEmail(req.body.email , verificationCode);
    }catch(error) {
      throw error;
      req.flash('error' , error.message)
    }
    req.flash('success' , 'Please, Verify your email to continue.')
    res.redirect('/signin');
  }
}

usersController.signin = async (req, res) => {
  if(req.session.user) {
    return res.redirect('/')
  }
  res.render('signin');
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
            return res.redirect('/signin')
          }
          // password matched, set session and redirect.
          req.session.user = user;
          return res.redirect('/')        
        }
      }
      res.redirect('/signin')
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
     res.redirect('/signin')
    });
  }

  usersController.verifyAccount = async(req, res) => {
    let { verificationCode } = req.params;
    let user = await User.findOneAndUpdate({ verificationCode : verificationCode } , {isVerified : true});
    if( user ) {
      req.flash('success', 'Account activated, You may login now.')
      res.redirect('/signin')
    }else {
      req.flash('error', 'Invalid access.');
      res.redirect('/signin')
    }
  }
export default usersController;