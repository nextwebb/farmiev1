
const User = require('../models/User')
const Product = require('../models/Product')


exports.home = function(req, res) {
    //calls the appropriate view template
    Product.veiwAllProducts().then((products)=>{
        res.render("home-guest", {products : products}) 
        //console.log(products)
      }).catch((err)=>{
        console.log(err)
      })
}
exports.about = function(req, res) {
    //calls the appropriate view template
    res.render('about')
}
exports.products = function(req, res) {
    //calls the appropriate view template
    res.render('products')
}
exports.farmingPractice = function(req, res) {
    //calls the appropriate view template
    res.render('farming-practice')
}
exports.contact = function(req, res) {
    //calls the appropriate view template
    res.render('contact')
}
exports.login = function(req, res) {
    let user = new User(req.body)
    // console.log(user.data)
    user.login().then((result)=>{
        req.session.user = {username: user.data.username, _id: user.data._id}
        req.session.save(function() {
            console.log(result)
            res.render('admin_index')
           
        })

    }).catch((e)=>{
        console.log(e)
        req.flash('errors', e)
        req.session.save(function() {
            res.redirect('/')
          })
    })  
   
}

exports.mustBeLoggedIn = function(req, res, next) {
    // check if this user has session data
    if (req.session.user) {
        next()
      } else {
       req.flash("errors", "You must be logged in to perform that action.")
        req.session.save(function() {
          res.redirect('/')
        })
      }
}

exports.openRegAdminForm = function( req, res){
    // check if this user has session data
    if( req.session.user) {
        res.render("admin_register", {regErrors: req.flash('regErrors')})
    } 
    return
}

exports.registerAdmin = function(req, res) {
  
   let user = new User(req.body)
  // console.log(user.data)

   user.register().then((data)=>{
    req.flash("success", "Successful registration!")
    req.session.user = {username: user.data.username,_id: user.data._id}
    req.session.save(function() {
        res.redirect('/admin')
    })
   }).catch((errors)=>{
    errors.forEach(function(error) {
        req.flash('regErrors', error)
        console.log("regErrors:", error)
      })
      req.session.save(function() {
          // only after it has saved session data 
          //reloads the same page
          // which is still the registration page
       res.redirect('/admin/openRegAdminForm')

      })
   })

}

exports.redirectToAdmin = function(req, res){
    // redirects to admin homepage
    res.render('admin_index')

}

exports.logOut = function(req, res) {
    req.session.destroy(function() {
        res.redirect('/')
        console.log("Logout Successful!")
      })
}















































