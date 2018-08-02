import University from '../models/university';
import {check , validationResult } from "express-validator/check";
import { matchedData } from 'express-validator/filter';

const programs = {};

programs.addProgram = async ( req, res ) => {
  const universities = await University.find({}, {"universityName" : 1})
  res.render('adminViews/programViews/addProgram' , {universities : universities})
}

programs.storeProgram = async (req, res, next) => {
  try {
    let universityId = req.body.universityName;
    
    const universities = await University.find({} , {"universityName" : 1 })

    const errors = await validationResult(req);
    if (!errors.isEmpty()){
      const program = matchedData(req);
      return res.render('adminViews/programViews/addProgram', { program : program , errors : errors.mapped() ,
      universities : universities , universityId : universityId })
    }else {
      const universityId = req.body.universityName;
      let programs = {"programName" : req.body.programName,
        "departmentName" : req.body.departmentName,
        "degree" : req.body.degree,
        "duration" : req.body.duration,
        "entryRequirement" : req.body.entryRequirement,
        "totalFee" : req.body.totalFee,
        "programType":req.body.programType,
        "creditHours" : req.body.creditHours,
        "entryTestDate" : req.body.entryTestDate,
        "applicationDate" : req.body.applicationDate,
        "documentSubmissionDate" : req.body.documentSubmissionDate,
        "admissionDecisionDate" : req.body.admissionDecisionDate,
        "financialAid" : req.body.financialAid
      };
        const isUpdated = await University.findOneAndUpdate({_id : universityId} , {$push : {programs : programs}})
        if(isUpdated){
          req.flash('success' , 'Program successfully added.')
          res.redirect('/admin/program/add');
        }
     }
  }catch(error){
    next(error);
  }
}
 
programs.getProgramById = async ( req, res ) => {
  let { universityId } = req.params;
  let { programId } = req.params;

  const program = await University.findOne({
    '_id' : universityId,
    'programs._id' : programId
  }, 
    {'programs.$' : 1}
  )
  // res.send(program)
  res.render('adminViews/programViews/programDetail' , { program : program });
}

export default programs;