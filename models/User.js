const validator = require("validator");
const bcrypt = require("bcryptjs")
const md5 = require('md5')
const usersCollection = require("../db").db().collection("users")

let User = function(data) {
   this.data = data;
   this.errors = [];
    
}
User.prototype.cleanUp = function() {
    if(typeof(this.data.fname) != "string") {
        this.data.fname = ""
    }
    if(typeof(this.data.lname) != "string") {
        this.data.username = ""
    }
    if(typeof(this.data.email) != "string") {
        this.data.email = ""
    }
    if(typeof(this.data.password) != "string") {
        this.data.password = ""
    }

    // get rid of any bogus properties
    this.data = {
        fname: this.data.fname.trim().toLowerCase(),
        lname: this.data.lname.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password,
        username: this.data.fname.trim().toLowerCase() +""+ Math.floor(Math.random() * 101)
    }
}

    User.prototype.validate = function(cleanUp) {
            if(cleanUp == "undefined"){
                cleanUp == false

            }
              
                if(this.data.fname == ""){
                    this.errors.push("You must provide a first name.")
                }
                if(this.data.fname != "" && !validator.isAlpha(this.data.fname)){
                    this.errors.push("first Name can only contain letters.");
                }
                if(this.data.lname == ""){
                    this.errors.push("You must provide a last name.")
                }
                if(this.data.lname != "" && !validator.isAlpha(this.data.fname)){
                    this.errors.push("last Name can only contain letters.");
                }
                if(!validator.isEmail(this.data.email)){
                    this.errors.push("You must provide a valid email address.")
                }
                if(this.data.password == ""){
                    this.errors.push("You must provide a password.")
                }
                if(this.data.password.length > 0 &&this.data.password.length < 12){
                    this.errors.push("Password must be at least 12 characters.")
                }
                if(this.data.password.length > 100){
                    this.errors.push("Password cannot exceed 100 characters")
                }
                if(this.data.fname.length > 0 &&this.data.username.length < 3){
                    this.errors.push("First name must be at least 3 characters.")
                }
                if(this.data.fname.length > 0 &&this.data.username.length < 3){
                    this.errors.push("Last name must be at least 3 characters.")
                }
                if(this.data.password.length > 30){
                    this.errors.push("Password cannot exceed 30 characters")
                }
               
        }
       
        

    User.prototype.register = function() {

       
        return new Promise((resolve, reject)=>{
            this.cleanUp()
            this.validate()

            if(!this.errors.length){
                //resolve("No errors!")
                resolve(this.data)

            } else{
               reject(this.errors)
            }
        })
        
       
        
     
     
    }
module.exports = User;