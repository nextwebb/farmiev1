
const Product = require('../models/Product')

exports.createProduct = function(req, res) {
    //res.send("Create new farm Product!")
    res.render("create_product")
}