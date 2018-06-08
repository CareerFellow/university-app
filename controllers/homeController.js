const homeController = {}

homeController.index = (req , res) => {
  if(req.session.user) {
    return res.redirect('/')
  }
  res.render('signup')
}

export default homeController;