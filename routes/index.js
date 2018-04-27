import express from "express";
var router = require('express-promise-router')();

import universities from "./../controllers/universitiesController";

router.route('/')
  .get(universities.index);

router.route('/university')
  .post(universities.storeUniversity)
  .get(universities.getUniversities)

router.route('/university/add')  
  .get(universities.addUniversity);

router.route('/university/:universityId')  
  .put(universities.replaceUniversity)
  .patch(universities.updateUniversity)
  .get(universities.getUniveristyById)
  .delete(universities.deleteUniversity)

export default router;