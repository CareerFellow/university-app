
import User from './../models/User';
import flash from 'connect-flash';


import { check , validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";

import nodemailer from 'nodemailer';

import crypto from 'crypto';

const usersController = {}

let transporter = nodemailer.createTransport({
  service : 'gmail',
  auth : {
    user : process.env.SENDER_EMAIL,
    pass : process.env.SENDER_PASSWORD
  }
})

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

      let html = `<h3> Welcome to University App. </h3> </br>` + 
                 `<p> Please, click the url below to verify your account.</p> </br>` +
                 `<p> http://localhost:3000/verify_account/${verificationCode} </p>`;
      let mailOptions = {
        from : 'devswaam@gmail.com',
        to : req.body.email,
        subject : 'Welcome to University App',
        html : html
      }      
      transporter.sendMail(mailOptions, (error , info) => {
        if(error) {
          req.flash('error' , error)
        }
      })
    }catch(error) {
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
            console.log('user not verified!')
            let html =`<h3>Please, Click the link below </h3> </br> ` + 
                      `<p>http://localhost:3000/verify_account/${user.verificationCode} </p>`;
            let mailOptions = {
              from : 'devswaam@gmail.com',
              to : user.email,
              subject : 'Welcome to University App',
              html : html
            }      
            transporter.sendMail(mailOptions, (error , info) => {
              if(error) {
                req.flash('error' , error)
              }
            })
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
    // console.log(verificationCode)
  }
export default usersController;