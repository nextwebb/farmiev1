
const Siteprofile = require('../models/Siteprofile')
const Resize =  require('../models/Resize')
const path =    require('path')
const upload =  require('../uploadMiddleware').single('uploads')

exports.viewAllSitedataApi = function(req, res){
    Siteprofile.viewAllSitedata().then(sitedata=>
        res.json(sitedata)).catch(err=>
        res.json(err))
}

exports.updateSitedataApi = function(req, res){
   let profile = new Siteprofile(req.body)
   profile.updateSitedata().then(data=>
        res.json(data)).catch(err=>
        res.json(err))
}