
const Product = require('../models/Product')

exports.createProduct = function(req, res) {
    res.render("create_product")
}

exports.submitProduct = function(req, res) {
    let product = new Product(req.body)
        product.create(req, res).then((data)=>{
            req.flash("success", "Successfully added Product to Inventry.")
            req.session.save(() => res.redirect("/admin/create-product"))
        }).catch((errors)=>{
            errors.forEach(error => req.flash("errors", error))
            req.session.save(() => res.redirect("/admin/create-product"))
        })
    
}
