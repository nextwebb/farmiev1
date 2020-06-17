
const Siteprofile = require('../models/Siteprofile')

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
            console.log(err + 'ERROR: Could not connect to the protected route');
            res.sendStatus(403);
            return;
        }       
            let profile = new Siteprofile(req.body)
            profile.updateSitedata()
            .then((data) =>
                 res.json(data)
            )
            .catch((err) =>
                 res.json(err)
            )
    })
   
}

exports.sendMessage = function(req, res){
    console.log(req.body);
    Siteprofile.contactMessage(req.body).then((response) => {
        res.status(200).json({
            status: true,
            data:response
          });
    }).catch(err => {
    //          // bad request
    res.status(400).json({
        status: false,
        data: err
      });
    })
}