import express from "express";
var router = require('express-promise-router')();

import universities from "./../controllers/universitiesController";
import { schemas , validateBody , validateParams } from '../helpers/routeHelpers';

router.route('/')
  .get(universities.index);

router.route('/university')
  .post( validateBody(schemas.validateUniversity) , universities.storeUniversity)
  .get( universities.getUniversities)

router.route('/university/add')  
  .get(universities.addUniversity);
  
router.route('/university/update/:universityId')  
  .get(universities.showUniversity)
  .post(validateBody(schemas.validateUniversity) , universities.updateUniversity);

router.route('/university/delete/:universityId')  
  // .put(universities.replaceUniversity)
  // .get(universities.getUniveristyById)
  .get(universities.deleteUniversity)

export default router;