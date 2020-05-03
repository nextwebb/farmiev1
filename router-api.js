const apiRouter = require('express').Router()

const userController = require('./controllers/userController')
const productController = require('./controllers/productController')
const servicesController = require('./controllers/servicesController')
const siteprofileController = require('./controllers/siteprofileController')
const cors = require('cors')

apiRouter.use(cors())





apiRouter.get('/v1/services/viewAllServices', servicesController.viewAllServicesApi)

apiRouter.get('/v1/site-profile/viewAllSitedata', siteprofileController.viewAllSitedataApi)

apiRouter.post('/v1/site-profile/update', siteprofileController.updateSitedataApi)

module.exports = apiRouter; 