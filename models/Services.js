const servicesCollection = require('../db').db().collection("Services")
const ObjectID = require('mongodb').ObjectID
const sanitizeHTML = require('sanitize-html')
const sharp = require('sharp');

//function contructor
let Services = function(data, file){
    this.data = data
    this.errors = []
    if (file == undefined) {file = false} //prevents errors
    if (file) {
      this.file = file
    }
}

Services.prototype.cleanUp = function(){

}

Services.prototype.ifImageExists = function() {

}
Services.prototype.create = function(){

}

Services.veiwAllServicess = function() {

}

Services.veiwSingleServicess = function() {

}

Services.deleteSingle = function(){

}
