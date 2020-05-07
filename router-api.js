const apiRouter = require('express').Router()

const userController = require('./controllers/userController')
const productController = require('./controllers/productController')
const servicesController = require('./controllers/servicesController')
const siteprofileController = require('./controllers/siteprofileController')
const cors = require('cors')

// httponly and secure https option prevents XXS attacks
// Using cookies + jwt i'm prone too to CSRF attacks 
// Increase CSRF protection by restricting  Origin access

cors({
  origin: [
    `${process.env.FRONTURL}`,
    'http://localhost:4000',
    'http://localhost:4000/admin',
  ],
  credentials: true
})



apiRouter.get('/v1/services/viewAllServices',   servicesController.viewAllServicesApi)

apiRouter.get('/v1/site-profile/viewAllSitedata', siteprofileController.viewAllSitedataApi)

apiRouter.get('/v1/products/viewAllProducts',   productController.viewAllProductApi)

apiRouter.post("/v1/admin/login", userController.login)

apiRouter.post('/v1/site-profile/update',  userController.checkToken, siteprofileController.updateSitedataApi)

module.exports = apiRouter; 