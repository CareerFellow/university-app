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

  console.log('reqbody : ' , req.body);
  const newUniversity = new University(req.body);
    try {
      const university = await newUniversity.save(); 
      console.log('men naihun')   
      req.flash('success' , 'User is successfully added.')

    }catch(error){
        req.flash('error' , 'User is failed to add.')
        console.log('men error hun');
    }
      res.redirect('/university/add');
}

universities.getUniversities = async (req , res) => {
  const universities = await University.find({});
  res.status(200).json({
    success : true,
    data  : universities
  })
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