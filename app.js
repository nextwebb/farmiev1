const express = require('express')
const app = express()
const session = require('express-session')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')(session)
const csrf = require('csurf')



const router = require('./router');//it expects a file router.js

//boiler plate code
app.use(express.urlencoded({extended: false}));
app.use(express.json());

let sessionOptions = session({
    secret: "codeninja writing nodejs",
    store: new MongoStore({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge:1000 * 60 * 60 * 24, httpOnly: true
    }
})



  
app.use(sessionOptions)
app.use(csrf())
app.use(flash())
app.use(function(req, res, next) {

    const token = req.csrfToken()
    res.locals.csrfToken = token
    res.cookie('csrf-token', token)

    // make all error, regErrors, and success flash messages available from all templates

    res.locals.errors = req.flash("errors")
    res.locals.success = req.flash("success")
    //res.locals.regErrors = req.flash("regErrors")

    // make logged in user session data available from within view templates
    res.locals.user = req.session.user

    next()
})




//we use the express feature to serve static files as images,css files and js files.
app.use(express.static('public')); 
app.use(express.static('public/img/bg-img')); 
app.use(express.static('public/img/core-img')); 
app.use(express.static('public/css')); 
app.use(express.static('public/scss')); 
app.use(express.static('public/mixins')); 
app.use(express.static('public/utilities')); 
app.use(express.static('public/fonts')); 
app.use(express.static('public/js')); 

app.use(express.static('public/admin')); 
app.use(express.static('public/admin/css')); 
app.use(express.static('public/admin/img'));
app.use(express.static('public/admin/js'));  
app.use(express.static('public/admin/js/demo'));
app.use(express.static('public/admin/scss'));
app.use(express.static('public/admin/navs'));
app.use(express.static('public/admin/utilities'));
app.use(express.static('public/admin/vendor'));
app.use(express.static('public/admin/vendor/bootstrap'));
app.use(express.static('public/admin/vendor/bootstrap/js'));
app.use(express.static('public/admin/vendor/bootstrap/scss'));
app.use(express.static('public/admin/vendor/bootstrap/scss/mixins'));
app.use(express.static('public/admin/vendor/bootstrap/scss/utilities'));
app.use(express.static('public/admin/vendor/bootstrap/scss/vendor'));
app.use(express.static('public/admin/vendor/chat.js'));
app.use(express.static('public/admin/vendor/datatables'));
app.use(express.static('public/admin/vendor/fontawesome'));
app.use(express.static('public/admin/vendor/fontawesome/css'));
app.use(express.static('public/admin/vendor/fontawesome-free/css'));
app.use(express.static('public/admin/vendor/fontawesome/js'));
app.use(express.static('public/admin/vendor/fontawesome/less'));
app.use(express.static('public/admin/vendor/fontawesome/scss'));
app.use(express.static('public/admin/vendor/fontawesome/sprites'));
app.use(express.static('public/admin/vendor/fontawesome/svgs'));
app.use(express.static('public/admin/vendor/fontawesome/svgs/brands'));
app.use(express.static('public/admin/vendor/fontawesome/svgs/regular'));
app.use(express.static('public/admin/vendor/fontawesome/svgs/solid'));
app.use(express.static('public/admin/vendor/fontawesome/webfonts'));
app.use(express.static('public/admin/vendor/fontawesome/jquery'));
app.use(express.static('public/admin/vendor/fontawesome/jquery-easing'));
app.use(express.static('public/admin/vendor/jquery'));
app.use(express.static('public/admin/vendor/jquery-easing'));



app.set('views', './views')
app.set('view engine', 'ejs')

app.use('/', router); 


module.exports = app
