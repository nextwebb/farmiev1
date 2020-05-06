const apiRouter = require('express').Router()

const userController = require('./controllers/userController')
const productController = require('./controllers/productController')
const servicesController = require('./controllers/servicesController')
const siteprofileController = require('./controllers/siteprofileController')
const cors = require('cors')

// httponly and secure https option prevents XXS attacks
// Using cookies + jwt i'm prone too to CSRF attacks 
// Increase CSRF protection by restricting  Origin access
const allowedDomains = [`${process.env.FRONTENDURL}`, 'http://localhost:4000'];
  apiRouter.use(cors({
  
    origin: function (origin, callback) {
  
      if (allowedDomains.indexOf(origin) === -1) {
  
        const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
  
        return callback(new Error(msg), false);
  
      }
  
      return callback(null, true);
  
    },
    credentials: true,
  
  }));
  




apiRouter.get('/v1/services/viewAllServices', servicesController.viewAllServicesApi)

apiRouter.get('/v1/site-profile/viewAllSitedata', siteprofileController.viewAllSitedataApi)

apiRouter.post("/v1/admin/login", userController.login)

apiRouter.post('/v1/site-profile/update', userController.checkToken, siteprofileController.updateSitedataApi)

module.exports = apiRouter; 