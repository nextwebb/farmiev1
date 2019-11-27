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
    if( this.data.fname && this.data.lname && this.data.email && this.data.password) {
        this.data = {
            fname: this.data.fname.trim().toLowerCase(),
            lname: this.data.lname.trim().toLowerCase(),
            email: this.data.email.trim().toLowerCase(),
            username: this.data.fname.trim().toLowerCase() +""+ Math.floor(Math.random() * 101) ,
            password: this.data.password,
        }
    } else {
        this.data = {
            username: this.data.fname.trim().toLowerCase() +""+ Math.floor(Math.random() * 101) ,
            password: this.data.password,
        }
    }
   
}

    User.prototype.validate = function() {
        return new Promise( async (resolve, reject)=>{
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
             // Only if username is valid then check to see if it's already taken
if (this.data.fname.length > 2 && this.data.fname.length && this.data.lname.length > 2 && this.data.lname.length < 31 && validator.isAlphanumeric(this.data.fname) && validator.isAlphanumeric(this.data.lname)) {
    let usernameExists = await usersCollection.findOne({username: this.data.username})
    if (usernameExists) {this.errors.push("That username is already taken.")}
  }

  // Only if email is valid then check to see if it's already taken
  if (validator.isEmail(this.data.email)) {
    let emailExists = await usersCollection.findOne({email: this.data.email})
    if (emailExists) {this.errors.push("That email is already being used.")}
  }
    resolve()
        })
            
            
               
        }
       
        

    User.prototype.register = function() {
        return new Promise( async(resolve, reject)=>{
            this.cleanUp()
           await this.validate()

            if(!this.errors.length){
               // hash user password
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            await usersCollection.insertOne(this.data)
                resolve()
            } else{
               reject(this.errors)
            }
        })       
    }

    User.prototype.login = function() {
        return new Promise((resolve, reject)=>{
           
            usersCollection.findOne({username: this.data.username}).then((attemptedUser)=>{
                if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
                    this.data = attemptedUser
                    resolve("Congrats!")
                  } else {
                    reject("Invalid username / password.")
                  }

            }).catch(()=>{
                reject("Please try again later.")
            })

        })
    }
module.exports = User;