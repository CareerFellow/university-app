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



export default universities;