import University from "./../models/university";
import flash from 'connect-flash';
const universities = {};

universities.index = async (req, res) => {
  res.render('home');
}

universities.addUniversity = async (req, res) => {
  res.render('addUniversity');
}

universities.storeUniversity = async (req, res) => {
  const newUniversity = new University(req.body);
    try {
      const university = await newUniversity.save();  
      req.flash('success' , 'User is successfully added.')

    }catch(error){
        req.flash('error' , error.message)
    }
      res.redirect('/university/add');
}

universities.getUniversities = async (req , res) => {
  try{
    const universities = await University.find({});
    res.render('home' , {allUniversities : universities});
  }catch(error){
    req.flash('error', error.message);
    res.redirect('/');
  }
}

universities.updateUniversity = async (req, res) =>{
  let { universityId } = req.params;
  let isUpdated = await University.findByIdAndUpdate(universityId , req.body);
  res.status(200).json({
    success : true,
  })
}

universities.replaceUniversity = async (req, res) => {
  let { universityId } = req.params;
  let isReplaced = await University.findByIdAndUpdate(universityId , req.body);
  res.status(200).json({
    success : true
  })
}

universities.getUniveristyById = async (req, res) => {
  let { universityId } = req.params;
  let university = await University.findById(universityId);
  if ( !university ) {
    return res.status(404).json({
      message : "No record found agains the given ID."
    })
  }
  res.status(200).json({
    success : true,
    data : university
  })
}

universities.deleteUniversity = async (req, res ) => {
  let { universityId } = req.params;
  let isDeleted = await University.findByIdAndRemove(universityId);
  res.status(200).json({
    success : true
  })
}


export default universities;