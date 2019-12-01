
const Product = require('../models/Product')

exports.createProduct = function(req, res) {
    //res.send("Create new farm Product!")
    res.render("create_product")
}

exports.submitProduct = function(req, res) {
    res.send("Created new farm Product!")
    console.log(res.body)
    
}
