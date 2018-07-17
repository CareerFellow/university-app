import express from "express";
var router = require('express-promise-router')();

import home from './../controllers/homeController';
import universities from "./../controllers/universitiesController";
import users from './../controllers/usersController';
import programs from './../controllers/programController';


import { addUniValidator , signupValidator, signinValidator, checkAuth, programValidator, forgotPasswordValidator} from '../helpers/validatorHelper';
import { check, validationResult } from "express-validator/check";

// Signup and Signin routes
router.route('/signup')
  .get(home.index)
  .post(signupValidator, users.signup)
router.route('/signin')
  .get(users.signin)
  .post(signinValidator , users.login)

// Main App (Secret)
router.route('/')
  .get(checkAuth ,users.home)

// Logout Route
router.route('/logout')
  .get(checkAuth , users.logout)

  // UNIVERSITY ROUTES
router.route('/university')
  .get( checkAuth, universities.getUniversities)
  .post(checkAuth, universities.findByName)

router.route('/university/add')  
  .get(checkAuth, universities.addUniversity)
  .post(checkAuth, addUniValidator,  universities.storeUniversity)

router.route('/university/update/:universityId')  
.get(checkAuth, universities.showUniversity)
.post(checkAuth, universities.updateUniversity)

router.route('/university/:universityId')
  .get(checkAuth, universities.getUniversityById)

router.route('/university/delete/:universityId')  
  .get(checkAuth, universities.deleteUniversity);

  // Program's ROUTE
router.route('/program/add')
  // .get(programs.deleteProgram)
  .get( checkAuth, programs.addProgram)
  .post( checkAuth, programValidator , programs.storeProgram)

router.route('/program/:universityId/:programId')  
  .get(checkAuth , programs.getProgramById)

router.route('/verify_account/:verificationCode')  
  .get(users.verifyAccount)

router.route('/forgotpassword')  
  .get(  users.forgotPassword)
  .post(signinValidator, users.updatePassword)

export default router;