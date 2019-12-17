const Multer = require('multer')
const fs = require('fs')
const path = require('path')

// Set The Storage Engine
const storage = Multer.diskStorage({
    destination: function (req, file, callback) { callback(null, '../public/uploads');},
    filename: function (req, file, callback) { callback(null, file.fieldname + '-' + Date.now());}})


// Init Upload
  const multipartUpload = Multer({
    storage: storage,
    limits:{fileSize: 1000000},
    fileFilter: function(req, file, cb){
        if( !checkFileType(file)){
            console.log("Error: Only Images!")
            req.flash("errors", " Only Images!")
            req.session.save()
            return
        } else{
          console.log("Upload sucessful!")
        }
        
    }
  }).single('uploads');

  // Check File Type
function checkFileType(file){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    //const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
  
    if(mimetype){
      return true
    } else {
        return false
  }
  
}


multipartUpload(req, res, (err) => {
    const fileName = req.file.filename
   const fields = req.body
   console.log(fileName)
   console.log(fields)

   if(err){
    req.flash("errors", "Server error,Try again later.")
    req.session.save(() => res.redirect("/create_product"))
  } else {
    if(req.file == undefined){
      req.flash("errors", "Error: No File Selected!")
    req.session.save(() => res.redirect("/create_product"))
    } else {
      //  let product = new Product(fields,fileName)
        //  product.create(req, res).then((data)=>{
        //      req.flash("success", "Successfully added Product to Inventry.")
        //      req.session.save(() =>  console.log("okay"))
        //  }).catch((errors)=>{
        //      errors.forEach(error => req.flash("errors", error))
        //      req.session.save(() => res.redirect("/create_product"))
             
        //  })
       
    }
  }
  })
   