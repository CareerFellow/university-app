import express from "express";
const router = express();

import universities from "./../controllers/universitiesController";


router.route('/')
  .get(universities.index);

router.route('/university/')
  .post(universities.addUniversity)
  .get(universities.getUniversity)
  .put(universities.replaceUniversity)
  .patch(universities.updateUniversity)

export default router;