const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');


router.get("/", userController.home);
router.get("/about", userController.about);
router.get("/products", userController.products);
router.get("/farming-practice", userController.farmingPractice);
router.get("/contact", userController.contact);



module.exports = router;
