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
  if (typeof(this.data.sitetitle) != "string") {this.data.sitetitle = ""}
  if (typeof(this.data.smalltext) != "string") {this.data.smalltext = ""}
  if (typeof(this.data.about) != "string") {this.data.about = ""}
  if (typeof(this.data.contacts.phone) != "number") {this.data.contacts.phone = ""}

  if (typeof(this.data.contacts.Address) != "string") {this.data.contacts.Address = ""}

  if (typeof(this.data.contacts.email) != "string") {this.data.contacts.email = ""}

  if (this.file && typeof(this.file.filename) != "string") {this.file.filename = ""}

  // get rid of any bogus properties

  this.data = {
    sitetitle: sanitizeHTML(
      this.data.sitetitle.trim(), {allowedTags: [], allowedAttributes: {}}
    ),
    smalltext: sanitizeHTML(
      this.data.smalltext.trim(), {allowedTags: [], allowedAttributes: {}}
      ),
    about: sanitizeHTML(
      this.data.about.trim(), {allowedTags: [], allowedAttributes: {}}
    ),
    contacts:{
      phone: sanitizeHTML(
        this.data.contacts.phone.trim(), {allowedTags: [], allowedAttributes: {}}
      ),
      phone: sanitizeHTML(
        this.data.contacts.Address.trim(), {allowedTags: [], allowedAttributes: {}}
      ),
      email: sanitizeHTML(
        this.data.contacts.email.trim(), {allowedTags: [], allowedAttributes: {}}
      )
    }, 
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



Siteprofile.viewAllSitedata = function() {
  return new Promise(async (resolve, reject) =>{
//console.log(siteprofileCollection)
    try {
      let profile = await siteprofileCollection.find({}).toArray()
        resolve(profile)

    } catch (error) {
      reject(error)
    }
  })
}

Siteprofile.updateSitedata =  function() {
     this.cleanUp()
  return new Promise(async (resolve, reject) =>{
//console.log(siteprofileCollection)
    try {
      let profile = await siteprofileCollection.update(
        {_id: new ObjectID(this.data._id) },
        {
         $set: {
              sitetitle:this.data.sitetitle,
              smalltext: this.data.smalltext,
              about: this.data.about,
              "contact.phone": this.data.contacts.phone,
              "contact.Address": this.data.contacts.    Address,
              "contact.email": this.data.contacts.email
         }
      }) 
    } 
    catch (error) {
      reject(error)
    }
  })
}

module.exports = Siteprofile


