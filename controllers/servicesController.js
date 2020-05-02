
const Services = require('../models/Services')
const Resize =  require('../models/Resize')
const path =    require('path')
const upload =  require('../uploadMiddleware').single('uploads')

exports.viewAllServices = function(req, res) {
  Services.veiwAllProducts().then((services)=>{
    console.log(services)
    res.render("admin_services", {services:services})
  }).catch((err)=>{
    console.log(err)
  })
 
}
exports.createService  = function(req, res){
  upload(req, res, (err) =>  {
   // console.log(req.body)
    if(err){
      req.flash("errors", "Service upload must be MAX of 1MB and Image format only!")
      req.session.save(() => res.redirect("/admin/services"))
      console.log(err)
     
    } else {

     // console.log(req.file)
      ( async function() {
       
          let imagePath = path.join( './public/uploads')
          let fileUpload = new Resize(imagePath)
          let fileSaveResponse =  await fileUpload.save(req.file.buffer)
      
    
        let service = new Services(req.body, fileUpload )
          service.create()
          .then( async (data)=>{
            console.log(data)
              req.flash("success", "Successfully added service.")
             req.session.save(() => res.redirect("/admin/services"))
          }).
        catch(function(errors) {
          if(errors){
           console.log(errors)
           errors.forEach(error => req.flash("errors", error))
           req.session.save(() => res.redirect("/admin/services"))
          }
                 
       })

       })() 
    }
  })
}

exports.viewAllServicesApi = function(req, res) {
  Services.veiwAllProducts().then((services)=>{
    //console.log(services)
    res.json(services)
  }).catch((err)=>{
    //console.log(err)
    res.json(err)
  })
 
}

exports.deleteSingleService = function(req, res){

}



