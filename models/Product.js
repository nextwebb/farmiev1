const ProductsCollection = require('../db').db().collection("Products")
const ObjectID = require('mongodb').ObjectID
const User = require('./User')
const sanitizeHTML = require('sanitize-html')
const sharp = require('sharp');



let Product = function(data, file) {
  this.data = data
  this.imagepath = this.data.image
  this.errors = []
  if (file == undefined) {file = false} //prevents errors
  if (file) {
    this.file = file
  }
 
}

Product.prototype.cleanUp = function() {

  if (typeof(this.data.name) != "string") {this.data.name = ""}
  if (typeof(this.data.catName) != "string") {this.data.catName = ""}
  if (typeof(this.data.quantity) != "string") {this.data.quantity = ""}
  if (typeof(this.data.rate) != "string") {this.data.rate = ""}
  if (typeof(this.data.discount) != "string") {this.data.discount = ""}
  if (typeof(this.data.location) != "string") {this.data.location = ""} 
  if (typeof(this.data.desc) != "string") {this.data.desc = ""}
  if(this.data.updated  && typeof(this.data.updated != "string")) {this.data.updated = ""}
  if (this.file && typeof(this.file.filename) != "string") {this.file.filename = ""}

  // get rid of any bogus properties
  
  this.data = {
    name: sanitizeHTML(this.data.name.trim(), {allowedTags: [], allowedAttributes: {}}),
    catName: sanitizeHTML(this.data.catName.trim(), {allowedTags: [], allowedAttributes: {}}),
    createdDate: new Date(),
    quantity: sanitizeHTML(this.data.quantity.trim(), {allowedTags: [], allowedAttributes: {}}),
    rate: sanitizeHTML(this.data.rate.trim(), {allowedTags: [], allowedAttributes: {}}),
    discount: sanitizeHTML(this.data.discount.trim(), {allowedTags: [], allowedAttributes: {}}),
    location: sanitizeHTML(this.data.location.trim(), {allowedTags: [], allowedAttributes: {}}),
    desc: sanitizeHTML(this.data.desc.trim(), {allowedTags: [], allowedAttributes: {}}),
    image : this.ifImageExists(this.file)
  }
  
}
  // A 'static method', it's just like a normal function 
// it has no relation with any 'Product' object instance
Product.prototype.ifImageExists = function(data) {
  if(data){
    return data.filename
  } else{
    return this.imagepath.slice(22);
  }
}

Product.prototype.validate = function() {

  if (this.data.name == "") {this.errors.push("You must provide the product name.")}
  if (this.data.catName == "") {this.errors.push("You must provide the Product category.")}
  if (this.data.rate == "") {this.errors.push("You must provide the product rate.")}
  if (this.data.discount == "") {this.errors.push("You must the provide discounted rate.")}
  if (this.data.quantity == "") {this.errors.push("You must provide the quantity of products available.")}
  if (this.data.location == "") {this.errors.push("You must provide the Product location.")}
  if (this.data.desc == "") {this.errors.push("You must provide the Product description.")}
  if (!this.file ) {this.errors.push("Error: No Product Image File Selected!.")}

}

Product.prototype.create = function() {
  return new Promise( async(resolve, reject) => {
    this.cleanUp()
    this.validate()
    if (!this.errors.length) {
      // save Product into database
       console.log(this.data)
       
      ProductsCollection.insertOne(this.data).then((info) => {
        resolve(info.ops[0]._id)
      }).catch(() => {
        console.log("THeres were some errors")
        this.errors.push("Please try again later.")
        reject(this.errors)
        
      })
    } else {
      reject(this.errors)
    }
  })
}

Product.veiwAllProducts = function() {
  return new Promise(async (resolve, reject) =>{
    try {
      let products = await ProductsCollection.find({}).toArray()
           // clean up each product array
          //  products = products.map((product)=>{
          //     product.location =undefined
          //     product.image = undefined
              
          //   return product
            
          //  })

        resolve(products)

    } catch (error) {
      reject(error)
    }
  })
}

Product.viewSingleProduct = function(productId) {
 return new Promise( async(resolve, reject) => {
   
      if (typeof(productId) != "string" || !ObjectID.isValid(productId)) {
        reject("errors in productId string")
        return
      }
      try {
        let product = await ProductsCollection.find({_id: new ObjectID(productId)}).toArray() 
        resolve(product[0])
       
       
      } catch (error) {
        reject("errors")
        
      }
 })
}

Product.updateImage = function(id, data) {
  return new Promise(async (resolve, reject) => {
    
      let query = {
        _id:  new ObjectID(id)
      }
      let update = {
        $set : {
          image : data
        }
      }
      await ProductsCollection.findOneAndUpdate(query, update).then(()=>{
        resolve("Succesfully Updated db!")
      }).catch((err)=>{
        reject(err)
      })
       
    
  })
}

Product.prototype.actuallyUpdate = function() {
  return new Promise(async (reject,resolve) => {
    this.cleanUp()
  //  console.log(this.data)
    
      let query = { name: this.data.name};
      let update = {$set: {
        name: this.data.name,
        catName: this.data.catName,
        quantity: this.data.quantity,
        rate: this.data.rate,
        discount:this.data.discount,
        location:this.data.location,
        desc: this.data.desc,
        createdDate: new Date(),
        image: this.data.image
          } };
        await ProductsCollection.findOneAndUpdate(query, update)
        .then((obj) => { 

          resolve(obj + "sucessfully updated!")
          
          }) 
          
          .catch((err) => { 
          
          console.log('Error: ' + err); 
          reject("error while updating")
          
          }) 
     
      
   
    
  })
}

Product.deleteSingle = function(productId) {
  return new Promise(async (resolve, reject)=>{
    if (typeof(productId) != "string" || !ObjectID.isValid(productId)) {
      reject("errors in productId string")
      return
    }
    try {
      let product = await ProductsCollection.deleteOne({_id: new ObjectID(productId)})
      resolve("Successfully deleted this Product!")
     
    } catch (error) {
      reject("Server errors")
      
  }
})
}



  
   






Product.reusableProductQuery = function(uniqueOperations, visitorId) {
  return new Promise(async function(resolve, reject) {
    let aggOperations = uniqueOperations.concat([
      {$lookup: {from: "users", localField: "author", foreignField: "_id", as: "authorDocument"}},
      {$project: {
        title: 1,
        body: 1,
        createdDate: 1,
        authorId: "$author",
        author: {$arrayElemAt: ["$authorDocument", 0]}
      }}
    ])

    let Products = await ProductsCollection.aggregate(aggOperations).toArray()

    // clean up author property in each Product object
    Products = Products.map(function(Product) {
      Product.isVisitorOwner = Product.authorId.equals(visitorId)
      Product.authorId = undefined

      Product.author = {
        username: Product.author.username,
        avatar: new User(Product.author, true).avatar
      }

      return Product
    })

    resolve(Products)
  })
}

Product.findSingleById = function(id, visitorId) {
  return new Promise(async function(resolve, reject) {
    if (typeof(id) != "string" || !ObjectID.isValid(id)) {
      reject()
      return
    }
    
    let Products = await Product.reusableProductQuery([
      {$match: {_id: new ObjectID(id)}}
    ], visitorId)

    if (Products.length) {
      resolve(Products[0])
    } else {
      reject()
    }
  })
}

Product.findByAuthorId = function(authorId) {
  return Product.reusableProductQuery([
    {$match: {author: authorId}},
    {$sort: {createdDate: -1}}
  ])
}

Product.delete = function(ProductIdToDelete, currentUserId) {
  return new Promise(async (resolve, reject) => {
    try {
      let Product = await Product.findSingleById(ProductIdToDelete, currentUserId)
      if (Product.isVisitorOwner) {
        await ProductsCollection.deleteOne({_id: new ObjectID(ProductIdToDelete)})
        resolve()
      } else {
        reject()
      }    
    } catch(error) {
      reject()
    }
  })
}

Product.search = function(searchTerm) {
  return new Promise(async (resolve, reject) => {
    if (typeof(searchTerm) == "string") {
      let Products = await Product.reusableProductQuery([
        {$match: {$text: {$search: searchTerm}}},
        {$sort: {score: {$meta: "textScore"}}}
      ])
      resolve(Products)
    } else { 
      reject()
    }
  })
}

Product.countProductsByAuthor = function(id) {
  return new Promise(async (resolve, reject) => {
    let ProductCount = await ProductsCollection.countDocuments({author: id})
    resolve(ProductCount)
  })
}

Product.getFeed = async function(id) {
  // create an array of the user ids that the current user follows
  let followedUsers = await followsCollection.find({authorId: new ObjectID(id)}).toArray()
  followedUsers = followedUsers.map(function(followDoc) {
    return followDoc.followedId
  })

  // look for Products where the author is in the above array of followed users
  return Product.reusableProductQuery([
    {$match: {author: {$in: followedUsers}}},
    {$sort: {createdDate: -1}}
  ])
}

module.exports = Product