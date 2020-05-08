
const User = require('../models/User')
const Product = require('../models/Product')
const jwt = require('jsonwebtoken')


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
    user.login().then((token)=>{
        
        req.session.user = {
            username: user.data.username, 
            _id: user.data._id,
        }
        req.session.save(function() {
        
             res.cookie("jwt", token, {
                maxAge:1000 * 60 * 60 * 24,
                secure: true, // set to true if your using https
                httpOnly: true,
              });
            res.render('admin_index')
            console.log(req.cookies)
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
//Check to make sure header is not undefined, if so, return Forbidden (403)
    exports.checkToken = async  (req, res, next) => {  
        const token = req.cookies.jwt || " ";
        console.log(req.cookies)
        try {
            if (!token) {
                
              return res.status(401).json('You need to Login')
            }
             await jwt.verify(token, process.env.JWTSECRET);
            req.token = token          
            next();
          } catch (err) {
              console.log(err)
            return res.status(500).json(err.toString());
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
        res.clearCookie("jwt");
        res.redirect('/')
        console.log("Logout Successful!")


      })
}















































