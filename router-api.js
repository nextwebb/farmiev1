const apiRouter = require('express').Router()

const userController = require('./controllers/userController')
const productController = require('./controllers/productController')
const servicesController = require('./controllers/servicesController')
const siteprofileController = require('./controllers/siteprofileController')
const cors = require('cors')

// httponly and secure https option prevents XXS attacks
// Using cookies + jwt i'm prone too to CSRF attacks 
// Increase CSRF protection by restricting  Origin access


var whitelist = [ 'http://localhost:4000', `${process.env.FRONTENDURL}`,  'http://localhost:4000/admin']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}


apiRouter.get('/v1/services/viewAllServices', cors(),  servicesController.viewAllServicesApi)

apiRouter.get('/v1/site-profile/viewAllSitedata', cors(), siteprofileController.viewAllSitedataApi)

apiRouter.get('/v1/products/viewAllProducts', cors(),   productController.viewAllProductApi)

apiRouter.post("/v1/admin/login", cors(), userController.login)

apiRouter.get("/v1/admin/users/all", cors(corsOptions),  userController.checkToken, userController.getAllUsersApi)

apiRouter.post('/v1/site-profile/update', cors(corsOptions),  userController.checkToken, siteprofileController.updateSitedataApi)

module.exports = apiRouter; 