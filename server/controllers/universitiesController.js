import University from "./../models/university";


const universities = {

};

universities.index = async (req, res) => {
  
  res.status(200).json({
    message : "Welcome to home page."
  })
}


universities.addUniversity = async (req, res) => {

  const newUniversity = new University(req.body);
  const university = await newUniversity.save();  
  return res.status(200).json({
    message : "university added."
  })
}

universities.getUniversity = async (req , res) => {

}

universities.updateUniversity = async (req, res) =>{

}

universities.replaceUniversity = async (req, res) => {

}

export default universities;