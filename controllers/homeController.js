const homeController = {}

homeController.dashboard = (req, res) => {
  res.render('pages/dashboard')
}

homeController.index = async (req, res) => {
  res.render('pages/index')
}
export default homeController;