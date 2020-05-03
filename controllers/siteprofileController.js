
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

exports.updateSitedataApi = function(req, res){
    console.log(req.body)
    // let profile = new Siteprofile(req.body)
    //     profile.updateSitedata().then(()=>{
    //         console.log("success!")
    //     }).catch((err)=>{
    //         console.log(err)
    //     })
}