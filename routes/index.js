import express from "express";
var router = require('express-promise-router')();

import home from './../controllers/homeController';
import universities from "./../controllers/universitiesController";
import users from './../controllers/usersController';
import programs from './../controllers/programController';


import { addUniValidator , signupValidator, signinValidator, checkAuth, programValidator } from '../helpers/validatorHelper';
import { check, validationResult } from "express-validator/check";

// Signup and Signin routes
router.route('/signup')
  .get(home.index)
  .post( users.signup)
router.route('/signin')
  .get(users.signin)
  .post(signinValidator , users.login)

// Main App (Secret)
router.route('/')
  .get( checkAuth ,users.home)

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

router.route('/university/delete/:universityId')  
  .get(checkAuth, universities.deleteUniversity);

  // Program's ROUTE
router.route('/program/add')
  // .get(programs.deleteProgram)
  .get(programs.addProgram)
  .post( programValidator , programs.storeProgram)

export default router;