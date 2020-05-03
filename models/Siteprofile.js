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
  if (typeof(this.data.contacts.phone) != "string") {this.data.contacts.phone = ""}

  if (typeof(this.data.contacts.Address) != "string") {this.data.contacts.Address = ""}

  if (typeof(this.data.contacts.email) != "string") {this.data.contacts.email = ""}

  if (typeof(this.data.logo) != "string") {this.data.contacts.logo = ""}

  // get rid of any bogus properties

  this.data = {
    _id : ObjectID(this.data._id),
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
      Address: sanitizeHTML(
        this.data.contacts.Address.trim(), {allowedTags: [], allowedAttributes: {}}
      ),
      email: sanitizeHTML(
        this.data.contacts.email.trim(), {allowedTags: [], allowedAttributes: {}}
      )
    }, 
    
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

Siteprofile.prototype.updateSitedata =  function() {
     this.cleanUp()
     //console.log(this.data)
  return new Promise(async (resolve, reject) =>{

    try {
       await siteprofileCollection.updateOne(
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
      resolve("successfully updated site profile!") 
    } 
    catch (error) {
      reject("An error occured , try again later!")
    }
  })
}

module.exports = Siteprofile


