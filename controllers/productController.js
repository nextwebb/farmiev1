
const Product = require('../models/Product')
const Resize = require('../models/Resize');
const multer = require('multer')
const path = require('path')
const sharp = require('sharp')
const fs = require("fs")



// Set The Storage Engine
const storage = multer.diskStorage({
 destination:  'public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('uploads');

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}



exports.createProduct = function(req, res) {
    res.render("create_product")
}

exports.submitProduct = function(req, res) {
  upload(req, res, (err) => {
     
    if(err){
      req.flash("errors", "Product must be MAX 1MB and Image format only!")
      req.session.save(() => res.redirect("/admin/create-product"))
     
    } else {

      ( function() {
        const imagePath = path.join( './public/uploads')
        console.log(imagePath)

        const fileUpload = new Resize(imagePath)
        const filename =  fileUpload.save(req.file.path)

      //   let product = new Product(req.body, req.file)
      //   product.create().then( async (data)=>{
          
      //     const filename = await fileUpload.save(req.file.path)
      //     console.log(filename)
      //       req.flash("success", "Successfully added Product to Inventry.")
      //       req.session.save(() => res.redirect("/admin/create-product"))
      //   }).
      //   catch(function(errors) {
      //     if(errors){
      //      console.log(errors)
      //      errors.forEach(error => req.flash("errors", error))
      //      req.session.save(() => res.redirect("/admin/create-product"))
      //     }
         
        
      //  })



       })() 

     

       
        
      
    }
  });
      
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
 // console.log("hello")
  upload(req, res, (err) => {
     
    if(err){
      req.flash("errors", "Product must be MAX 1MB and Image format only!")
      req.session.save(() => res.redirect("/admin/create-product"))
      console.log(err)
     
    } else {
     
        //  let product = new Product(req.body, req.file)
        //  product.create().then((data)=>{
        //    console.log(data)
        //      req.flash("success", "Successfully added Product to Inventry.")
        //      req.session.save(() => res.redirect("/admin/create-product"))
        //  }).
        //  catch(function(errors) {
        //    console.log(errors)
        //   errors.forEach(error => req.flash("errors", error))
        //   req.session.save(() => res.redirect("/admin/create-product"))
        // })
        console.log("Update image here")
        
      
    }
  });
 
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