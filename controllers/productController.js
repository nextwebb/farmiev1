
const Product = require('../models/Product')
const Resize =  require('../models/Resize')
const path =    require('path')
const upload =  require('../uploadMiddleware').single('uploads')

exports.createProduct = function(req, res) {
    res.render("create_product")
}

exports.submitProduct = function(req, res) {
 upload(req, res, (err) => {
     
    if(err){
      req.flash("errors", "Product must be MAX 1MB and Image format only!")
      req.session.save(() => res.redirect("/admin/create-product"))
     
    } else {

      ( async function() {
       
          let imagePath = path.join( './public/uploads')
          let fileUpload = new Resize(imagePath)
          let fileSaveResponse =  await fileUpload.save(req.file.buffer)
      
    
        let product = new Product(req.body, fileUpload )
          product.create().then( async (data)=>{
            
              req.flash("success", "Successfully added Product to Inventry.")
              req.session.save(() => res.redirect("/admin/create-product"))
          }).
        catch(function(errors) {
          if(errors){
           console.log(errors)
           errors.forEach(error => req.flash("errors", error))
           req.session.save(() => res.redirect("/admin/create-product"))
          }
         
        
       })



       })() 

     

       
        
      
    }
  }) 
      
}


exports.viewAllProduct = function(req, res) {
    
    Product.veiwAllProducts().then((products)=>{
      res.render("view_products", {products : products}) 
    }).catch((err)=>{
      console.log(err)
    })
}
  
exports.updateSingleProduct = function(req, res){
  Product.viewSingleProduct(req.params.id).then((product)=>{
    res.render("view_single_product", {product: product})
    
  }).catch((err)=>{
    console.log(err)
    
  })
}

exports.updateProduct = function(req, res){
  //console.log(req.body)
 let product = new Product(req.body)
 product.actuallyUpdate().then((result)=>{
  console.log(result)
 }).catch((err)=>{
  console.log(err)
 }) 
}

exports.updateImage = function(req, res) {
 
  upload(req, res, (err) => {
    console.log(req.params.id)   
    if(err){
      
     console.log(err)
     
    } else {

     console.log('req.file', req.file )

     const imagePath = path.join( './public/uploads')
    //  console.log(imagePath)
          let fileUpload = new Resize(imagePath)
          let fileSaveResponse =  fileUpload.save(req.file.buffer).then((data)=>{
            console.log(data)
            Product.updateImage(req.params.id, data).then((response)=>{
              console.log(response)
              req.flash("success", response)

              req.session.save(()=> res.redirect(`/admin/update-single-product/${productId}`))
            }).catch((err)=>{
                  console.log(err)
            })

          }).catch((err)=>{
              console.log(err)
              errors.forEach(error => req.flash("errors", error))
              req.session.save(() => res.redirect(`/admin/update-single-product/${productId}`))
          })
       
    }
  })
 
}

exports.deleteSingle = function(req, res) {
  Product.deleteSingle(req.params.id).then((response)=>{
    console.log(response)
    req.flash("success", response)
    req.session.save(() => res.redirect("/admin/view-products/"))

  }).catch((err)=>{
    console.log(err)
    errors.forEach(error => req.flash("errors", error))
    req.session.save(() => res.redirect("/admin/view-products/"))
  })
}