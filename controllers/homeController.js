const homeController = {}

homeController.index = (req , res) => {
  if(req.session.user) {
    return res.redirect('/')
  }
  res.render('signup')
}


homeController.dashboard = (req, res) => {
  res.json("This is admin dashboard.");
}
export default homeController;