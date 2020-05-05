
const Siteprofile = require('../models/Siteprofile')
const Resize =  require('../models/Resize')
const path =    require('path')
const upload =  require('../uploadMiddleware').single('uploads')
const jwt =  require('jsonwebtoken')

exports.viewAllSitedataApi = function(req, res){
    Siteprofile.viewAllSitedata().then(sitedata=>
        res.json(sitedata)).catch(err=>
        res.json(err))
}

exports.updateSitedataApi = function(req, res){
     //verify the JWT token generated for the user
     jwt.verify(req.token, 'mask up lagos', (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)

            console.log(err + 'ERROR: Could not connect to the protected route');
            res.sendStatus(403);
            return;
        }       
            let profile = new Siteprofile(req.body)
            profile.updateSitedata().then(data=>
                 res.json(data)).catch(err=>
                 res.json(err))
    })
   
}