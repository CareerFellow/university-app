import User from './../models/User';
import flash from 'connect-flash';

import { check , validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";

const usersController = {}

usersController.signup = async (req, res) => {
  
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    const user = matchedData(req);
    return res.render('signup' , { errors : errors.mapped() , users : user})
  }else {
    try {
      const newUser = new User(req.body);
      const user = await newUser.save();  
      req.flash('success' , 'Please, Login to continue.')
    }catch(error) {
      req.flash('error' , error.message)
    }
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