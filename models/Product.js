const productsCollection = require("../db").db().collection("products")

let Product = function(data){
    this.data = data
    this.errors = []
}
//add products
//view all products
//get product inventory
//delete product
exports.module = Product