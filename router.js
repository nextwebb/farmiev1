const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController')
const productController = require('./controllers/productController')

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
router.post("/admin/view-products", userController.mustBeLoggedIn, productController.viewAllProduct);
router.get("/admin/update-single-product/:id", userController.mustBeLoggedIn, productController.updateSingleProduct);
router.post("/admin/updateProduct/", userController.mustBeLoggedIn, productController.updateProduct);
router.post("/admin/upload_file/", userController.mustBeLoggedIn, productController.updateImage)
router.post("/admin/deleteSingle/:id", userController.mustBeLoggedIn, productController.deleteSingle)


// router.get("/purchase", userController.purchse); 
// router.get("/delivery", userController.delivery);
// router.get("/return", userController.return);
// router.get("/partners", userController.partners);
// router.get("/faqs", userController.faqs);
// router.get("/payments", userController.payments);




module.exports = router;
