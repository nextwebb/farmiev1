
const Services = require('../models/Services')
const Resize =  require('../models/Resize')
const path =    require('path')
const upload =  require('../uploadMiddleware').single('uploads')

exports.viewAllServices = function(req, res) {
  res.render("admin_services")
}
exports.createService  = function(req, res){

}
exports.viewSingleService = function(req, res) {
    
}
exports.deleteSingleService = function(req, res){

}



