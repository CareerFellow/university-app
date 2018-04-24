import express from "express";
var router = require('express-promise-router')();

import universities from "./../controllers/universitiesController";

router.route('/')
  .get(universities.index);

router.route('/university')
  .post(universities.addUniversity)
  .get(universities.getUniversity)
  .put(universities.replaceUniversity)
  .patch(universities.updateUniversity)

export default router;