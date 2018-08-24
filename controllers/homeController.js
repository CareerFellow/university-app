import University from '../models/university';

const homeController = {}

homeController.dashboard = (req, res) => {
  res.render('pages/dashboard')
}

homeController.index = async (req, res) => {
  const universities = await University.find().limit(5);
  res.render('pages/index', {
    universities: universities
  })
}
export default homeController;