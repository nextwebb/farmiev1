const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController')


router.get("/", userController.home)
router.get("/about", userController.about)
router.get("/products", userController.products)
router.get("/farming-practice", userController.farmingPractice)
router.get("/contact", userController.contact)
router.post("/login", userController.login)
router.get("/admin/openRegAdminForm",userController.mustBeLoggedIn,  userController.openRegAdminForm),
router.post("/admin/register",userController.mustBeLoggedIn,  userController.registerAdmin),

// router.get("/purchase", userController.purchse);
// router.get("/delivery", userController.delivery);
// router.get("/return", userController.return);
// router.get("/partners", userController.partners);
// router.get("/faqs", userController.faqs);
// router.get("/payments", userController.payments);




module.exports = router;
