const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController')
const productController = require('./controllers/productController')
const servicesController = require('./controllers/servicesController')
const siteprofileController = require('./controllers/siteprofileController')



// user related routes
router.get("/", userController.home)

router.get("/about", userController.about)

router.get("/products", userController.products)

router.get("/farming-practice", userController.farmingPractice)

router.get("/contact", userController.contact)

router.get("/admin/openRegAdminForm",userController.mustBeLoggedIn,  userController.openRegAdminForm)

router.post("/admin/register",userController.mustBeLoggedIn,  userController.registerAdmin)

router.post("/admin/login", userController.login)

router.get("/admin/logout",userController.mustBeLoggedIn, userController.logOut )

router.get("/admin",userController.mustBeLoggedIn, userController.redirectToAdmin )


// products related routes
router.get("/admin/create-product",userController.mustBeLoggedIn, productController.createProduct )

router.post("/admin/submit-product",userController.mustBeLoggedIn, productController.submitProduct) 

router.get("/admin/view-products", userController.mustBeLoggedIn, productController.viewAllProduct);

router.post("/admin/view-products", userController.mustBeLoggedIn, productController.viewAllProduct)

router.get("/admin/update-single-product/:id", userController.mustBeLoggedIn, productController.updateSingleProduct)

router.post("/admin/updateProduct/", userController.mustBeLoggedIn, productController.updateProduct)

router.post("/admin/upload_file/:id", userController.mustBeLoggedIn, productController.updateImage)

router.post("/admin/deleteSingle/:id", userController.mustBeLoggedIn, productController.deleteSingle)

// services routes
router.get('/admin/services', userController.mustBeLoggedIn, servicesController.viewAllServices)

router.post("/admin/create-service",userController.mustBeLoggedIn, servicesController.createService )

//  API's
router.get('/api/v1/admin-services/viewAllServicesApi', servicesController.viewAllServicesApi)

router.get('/api/v1/site-profile/viewAllSitedata', siteprofileController.viewAllSitedataApi)

router.post('api/v1/site-profile/update', siteprofileController.updateSitedataApi)



module.exports = router;
