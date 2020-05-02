const siteprofileCollection = require('../db').db().collection("Siteprofile")
const ObjectID = require('mongodb').ObjectID
const sanitizeHTML = require('sanitize-html')
const sharp = require('sharp');

//function contructor
let Siteprofile = function(data, file){
    this.data = data
    this.errors = []
    if (file == undefined) {file = false} //prevents errors
    if (file) {
      this.file = file
    }
}

Siteprofile.prototype.cleanUp = function(){
  if (typeof(this.data.name) != "string") {this.data.name = ""}
  if (typeof(this.data.desc) != "string") {this.data.desc = ""}
  if (this.file && typeof(this.file.filename) != "string") {this.file.filename = ""}

  // get rid of any bogus properties

  this.data = {
    name: sanitizeHTML(
      this.data.name.trim(), {allowedTags: [], allowedAttributes: {}}
    ),
    desc: sanitizeHTML(
      this.data.desc.trim(), {allowedTags: [], allowedAttributes: {}}
      ),
    image : this.ifImageExists(this.file)
  }
}

Siteprofile.prototype.ifImageExists = function(data) {
  if(data){
    return data.filename
  } else{
    return this.imagepath.slice(22);
  }
}

Siteprofile.prototype.validate = function() {

  if (this.data.name == "") {this.errors.push("You must provide the Service name.")}
  if (this.data.desc == "") {this.errors.push("You must provide the Service description.")}
  if (!this.file ) {this.errors.push("Error: No Service Image File Selected!.")}

}

Siteprofile.prototype.update = function() {
  return new Promise( async(resolve, reject) => {
    this.cleanUp()
    this.validate()
    if (!this.errors.length) {
      // save Product into database
       console.log(this.data)      
      SiteprofileCollection.insertOne(this.data)
      .then((info) => {
      resolve(info.ops[0]._id)
     }
     ).catch(() => {
        console.log("Theres were some errors")
        this.errors.push("Please try again later.")
        reject(this.errors)
        
     })
    } else {
      reject(this.errors)
    }
  })
}

Siteprofile.viewAllSitedata = function() {
  return new Promise(async (resolve, reject) =>{
    try {
      let profile = await SiteprofileCollection.find({}).toArray()
        resolve(profile)

    } catch (error) {
      reject(error)
    }
  })
}

module.exports = Siteprofile


