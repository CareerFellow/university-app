import University from "./../models/university";

import flash from 'connect-flash';
import {check , validationResult } from "express-validator/check";
import { matchedData } from "express-validator/filter";
const universities = {};

universities.index = async (req, res) => {
  res.render('signup');
}

universities.addUniversity = async (req, res) => {
  res.render('addUniversity');
}

universities.storeUniversity = async (req, res , next) => {
  const errors = await validationResult(req);
  if( !errors.isEmpty() ) {
    const university = matchedData(req);
    return res.render('addUniversity' , { errors : errors.mapped() , university : university });
  }else{
    try {
        const newUniversity = new University(req.body);
        const university = await newUniversity.save(req.body);
        req.flash('success' , 'University is successfully saved.')
      }catch(error){
        req.flash('error' , error.message);
      }
  }
  res.redirect('/university/add');
}

universities.getUniversities = async (req , res) => {
  try{
    const universities = await University.find({});
    res.render('universities' , {allUniversities : universities});
    
  }catch(error){
    req.flash('error', error.message);
    res.redirect('/');
  }
}

universities.showUniversity = async (req, res) => {
    let { universityId } = req.params;
    let university = await University.findById(universityId);
    if ( !university ) {
      req.flash('error', 'No record found against the given id.')
      return res.redirect('/university');
    }
    res.render('updateUniversity' , {universityData : university}); 
}

universities.updateUniversity = async (req, res) =>{
  let { universityId } = req.params;
  let isUpdated = await University.findByIdAndUpdate(universityId , req.body);
  if ( !isUpdated ) {
    req.flash('error', 'Couldnt update successfully.');
    res.redirect('/university/');
  }
  req.flash('success' , 'Successfully updated.');
  res.redirect('/university');
}


universities.deleteUniversity = async (req, res ) => {
  let { universityId } = req.params;
  let isDeleted = await University.findByIdAndRemove(universityId);
  if ( !isDeleted ) {
    req.flash('error' , 'Couldnt delete record.');
    res.redirect('/university');
  }
    req.flash('success' , 'Record is successfully deleted.');
    res.redirect('/university');
}

universities.findByName = async (req, res) => {
  let { universityName } = req.body;
  let university = await University.find({universityName});
  if( university.length < 1 )
  {
   return res.render('universities' , {noRecord : 'No record found.'})
  }
  res.render('universities' , {allUniversities : university});
}

universities.getUniversityById = async (req, res) => {
  let { universityId } = req.params;
  let university = await University.findOne({_id : universityId});
  res.render('universityDetail' , { university : university})
}

export default universities;