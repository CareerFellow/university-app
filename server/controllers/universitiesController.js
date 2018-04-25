import University from "./../models/university";
const universities = {};

universities.index = async (req, res) => {
  res.status(200).json({
    message : "Welcome to home page."
  })
}

universities.addUniversity = async (req, res) => {
  const newUniversity = new University(req.body);
  const university = await newUniversity.save();  
  return res.status(200).json({
    message : "University added successfully."
  })
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