const validator = require("validator")
const bcrypt = require("bcryptjs")
const usersCollection = require("../db").db().collection("users")
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


let User = function(data) {
   this.data = data
   this.errors = []
//    console.log(this.data)
    
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
    if(typeof(this.data.formtype) != "string") {
        this.data.formtype = ""
    }

    // get rid of any bogus properties
    if( this.data.formtype != undefined && this.data.formtype == "adminReg") {
        console.log("adminReg form")
        this.data = {
            fname: this.data.fname.trim().toLowerCase(),
            lname: this.data.lname.trim().toLowerCase(),
            email: this.data.email.trim().toLowerCase(),
            username: this.data.fname.trim().toLowerCase() +""+ Math.floor(Math.random() * 101) ,
            password: this.data.password,
        }
    } 
    if( this.data.formtype != undefined && this.data.formtype == "adminLogin") {
        console.log("adminLogin form")
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
                this.errors.push("first Name can only contain letters.")
            }
            if(this.data.lname == ""){
                this.errors.push("You must provide a last name.")
            }
            if(this.data.lname != "" && !validator.isAlpha(this.data.fname)){
                this.errors.push("last Name can only contain letters.")
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
            User.sendMail({
                to: `${this.data.email}`,
                from: `${process.env.EMAIL}`,
                subject: 'New Admin User registration',
                text: 'This user has admin privilegdes',
                html: `<strong> Hi 😀 ${this.data.fname} we've received your registration; Here's your username: <h1> ${this.data.username}</h1>  </strong>`
              });
              resolve(this.data);
            } else{
               reject(this.errors)
            }
        })       
    }

    // static sendMAIL method
User.sendMail = function (msg) {
    sgMail
      .send(msg)
      .then((data) => {
        console.log('Registered successfully!');
      }, (error) => {
        console.error(error);
  
        if (error.response) {
          console.error(error.response.body);
        }
      });
  };


    User.prototype.login =  function() {
        return new Promise(async(resolve, reject)=>{
           
            await usersCollection.findOne({username: this.data.username}).then((attemptedUser)=>{
                console.log(attemptedUser)
                if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
                    this.data = attemptedUser
                                        
                    jwt.sign({attemptedUser}, process.env.JWTSECRET, { expiresIn: '7d' },(err, token) => {
                        let identifier = { 
                            token: token,
                            email: this.data.email
                        }
                        if(err) { console.log(err) }    
                        resolve(identifier)
                        
                    }); 
                   
                  } else {
                    reject("Invalid username / password.")
                  }

            }).catch(()=>{
                reject("Please try again later.")
            })

        })
    }

User.getAll = async function(){
    return new Promise(async(resolve, reject)=>{
        await usersCollection.find({}).toArray().then(doc => resolve(doc)).catch(err=>reject(err))
    })
  
}
    

module.exports = User
