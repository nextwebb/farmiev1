const apiRouter = require('express').Router()

const userController = require('./controllers/userController')
const productController = require('./controllers/productController')
const servicesController = require('./controllers/servicesController')
const siteprofileController = require('./controllers/siteprofileController')
const cors = require('cors')


apiRouter.use(
    cors({
        credentials: true,
      origin: [
        `${process.env.FRONT_URL}`,
        'http://localhost:4000/admin',
      ]
     
    })
  );






apiRouter.get('/v1/services/viewAllServices', servicesController.viewAllServicesApi)

apiRouter.get('/v1/site-profile/viewAllSitedata', siteprofileController.viewAllSitedataApi)

apiRouter.post("/v1/admin/login", userController.login)

apiRouter.post('/v1/site-profile/update', userController.checkToken, siteprofileController.updateSitedataApi)

module.exports = apiRouter; 