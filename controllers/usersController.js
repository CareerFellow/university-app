import User from './../models/User';
import flash from 'connect-flash';

import { check , validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";

import nodemailer from 'nodemailer';

const usersController = {}

let transporter = nodemailer.createTransport({
  service : 'gmail',
  auth : {
    user : 'test@gmail.com',
    pass : 'test'
  }
})



usersController.signup = async (req, res) => {
  
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const user = matchedData(req);
    return res.render('signup' , { errors : errors.mapped() , users : user})
  }else {
    try {
      const newUser = new User(req.body);
      const user = await newUser.save(); 

      let mailOptions = {
        from : 'devswaam@gmail.com',
        to : req.body.email,
        subject : 'Welcome to University App',
        text : 'Dear User, We warmly welcome to this university app.'
      }
      
      transporter.sendMail(mailOptions, (error , info) => {
        if(error) {
          req.flash('error' , error)
        }
      })
    }catch(error) {
      req.flash('error' , error.message)
    }
    req.flash('success' , 'Please, Check your email and login to continue.')
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
          // password matched, set session and redirect.
          req.session.user = user;
          return res.redirect('/')        
        }
      }
      res.redirect('/signin')
    }catch( error){
      next(error)
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
export default usersController;