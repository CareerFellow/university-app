var router = require('express-promise-router')();

import home from './../controllers/homeController';
import universities from "./../controllers/universitiesController";
import users from './../controllers/usersController';
import programs from './../controllers/programController';

import {
  addUniValidator,
  signupValidator,
  signinValidator,
  checkAuth,
  programValidator,
} from '../helpers/validatorHelper';
import {
  check,
  validationResult
} from "express-validator/check";
import usersController from "./../controllers/usersController";
import homeController from "./../controllers/homeController";

// Signup and Signin routes
router.route('/admin/signup')
  .get(usersController.register)
  .post(signupValidator, usersController.signup)
router.route('/admin/signin')
  .get(users.signin)
  .post(signinValidator, usersController.login)
router.route('/admin/user/manage')
  .get(usersController.getAllUsers)
router.route('/admin/user/delete/:userId')
  .get(usersController.deleteUser)

// Admin Routes
router.route('/admin/dashboard')
  .get(homeController.dashboard)

router.route('/admin/university/add')
  .get(universities.addUniversity)
  .post(addUniValidator, universities.storeUniversity)
router.route('/admin/university/update/:universityId')
  .get(universities.showUniversity)
  .post(addUniValidator, universities.updateUniversity)
router.route('/admin/university/delete/:universityId')
  .get(universities.deleteUniversity);
router.route('/admin/university/manage')
  .get(universities.getUniversities)
  .post(universities.findByName)

router.route('/admin/program/add')
  .get(programs.addProgram)
  .post(programValidator, programs.storeProgram)
router.route('/admin/program/manage')
  .get(programs.getPrograms)
router.route('/admin/program/update/:universityId/:programId')
  .get(programs.showProgram)
  .post(programs.updateProgram)
router.route('/admin/program/delete/:universityId/:programId')
  .get(programs.deleteProgram)

// Main App (Secret)
router.route('/admin/')
  .get(checkAuth, users.home)

// Logout Route
router.route('/admin/signout')
  .get(checkAuth, users.signout)


// UNIVERSITY PUBLIC ROUTES

router.route('/')
  .get(homeController.index);

router.route('/universities')
  .get(universities.getAll)
  .post(universities.searchByKeywords)


// router.route('/university')
//   .get( checkAuth, universities.getUniversities)
//   .post(checkAuth, universities.findByName)

router.route('/university/:universityId')
  .get(checkAuth, universities.getUniversityById)

router.route('/program/:universityId/:programId')
  .get(checkAuth, programs.getProgramById)

router.route('/verify_account/:verificationCode')
  .get(users.verifyAccount)

router.route('/admin/forgotpassword')
  .get(users.forgotPassword)
  .post(signinValidator, users.updatePassword)

export default router;