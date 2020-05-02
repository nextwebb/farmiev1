
const Siteprofile = require('../models/Siteprofile')
const Resize =  require('../models/Resize')
const path =    require('path')
const upload =  require('../uploadMiddleware').single('uploads')

exports.viewAllSitedataApi = function(req, res){
    Siteprofile.viewAllSitedata().then((sitedata)=>{
        //console.log(sitedata)
        res.json(sitedata)
    }).catch((err)=>{
        console.log(err)
    })
}