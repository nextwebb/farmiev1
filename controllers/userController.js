
const User = require('../models/User');


exports.home = function(req, res) {
    //calls the appropriate view template
    res.render('home-guest');
}
exports.about = function(req, res) {
    //calls the appropriate view template
    res.render('about');
}
exports.products = function(req, res) {
    //calls the appropriate view template
    res.render('products');
}
exports.farmingPractice = function(req, res) {
    //calls the appropriate view template
    res.render('farming-practice');
}
exports.contact = function(req, res) {
    //calls the appropriate view template
    res.render('contact')
}
exports.login = function(req, res) {
    // call the appropriate view template
   // res.send('Login Successful!')
   res.render('admin_index')
}

exports.mustBeLoggedIn = function(req, res, next) {
    // check if this user has session data
    next()
}

exports.openRegAdminForm = function( req, res){
    // check if this user has session data
    res.render("admin_register")
}

exports.registerAdmin = function(req, res) {
  
   let user = new User(req.body)
  // console.log(user.data)

   user.register().then((data)=>{
    console.log(data)
   }).catch((errors)=>{
    console.log(errors)
   })

}

















































