import express from "express";
var router = require('express-promise-router')();

import universities from "./../controllers/universitiesController";
// import { schemas , validateBody , validateParams } from '../helpers/routeHelpers';
import {addUniValidator} from '../helpers/validatorHelper';
import { check, validationResult } from "express-validator/check";


router.route('/')
  .get(universities.index);

router.route('/university')
  .get( universities.getUniversities)
  .post(universities.findByName)

router.route('/university/add')  
  .get(universities.addUniversity)
  .post(addUniValidator,  universities.storeUniversity)

  router.route('/university/update/:universityId')  
  .get(universities.showUniversity)

router.route('/university/delete/:universityId')  
  .get(universities.deleteUniversity)

export default router;