const ProductsCollection = require('../db').db().collection("Products")
const ObjectID = require('mongodb').ObjectID
const User = require('./User')
const sanitizeHTML = require('sanitize-html')


let Product = function(data) {
  this.data = data
  this.errors = []
}

Product.prototype.cleanUp = function() {
  if (typeof(this.data.name) != "string") {this.data.name = ""}
  if (typeof(this.data.catName) != "string") {this.data.catName = ""}
  if (typeof(this.data.quantity) != "string") {this.data.quantity = ""}
  if (typeof(this.data.rate) != "string") {this.data.rate = ""}
  if (typeof(this.data.discount) != "string") {this.data.discount = ""}
  if (typeof(this.data.location) != "string") {this.data.location = ""} 
  if (typeof(this.data.filename) != "string") {this.data.filename = ""}
  if (typeof(this.data.desc) != "string") {this.data.desc = ""}

  // get rid of any bogus properties
  this.data = {
    name: sanitizeHTML(this.data.name.trim(), {allowedTags: [], allowedAttributes: {}}),
    catName: sanitizeHTML(this.data.catName.trim(), {allowedTags: [], allowedAttributes: {}}),
    createdDate: new Date(),
    quantity: sanitizeHTML(this.data.quantity.trim(), {allowedTags: [], allowedAttributes: {}}),
    rate: sanitizeHTML(this.data.rate.trim(), {allowedTags: [], allowedAttributes: {}}),
    discount: sanitizeHTML(this.data.discount.trim(), {allowedTags: [], allowedAttributes: {}}),
    location: sanitizeHTML(this.data.location.trim(), {allowedTags: [], allowedAttributes: {}}),
    filename: sanitizeHTML(this.data.filename.trim(), {allowedTags: [], allowedAttributes: {}}),
    desc: sanitizeHTML(this.data.desc.trim(), {allowedTags: [], allowedAttributes: {}}),
  }
}

Product.prototype.validate = function() {
  if (this.data.name == "") {this.errors.push("You must provide the product name.")}
  if (this.data.catName == "") {this.errors.push("You must provide the Product category.")}
  if (this.data.rate == "") {this.errors.push("You must provide the product rate.")}
  if (this.data.discount == "") {this.errors.push("You must the provide discounted rate.")}
  if (this.data.quantity == "") {this.errors.push("You must provide the quantity of products available.")}
  if (this.data.location == "") {this.errors.push("You must provide the Product location.")}
  if (this.data.filename == "") {this.errors.push("You must provide the product  image.")}
  if (this.data.desc == "") {this.errors.push("You must provide the Product description.")}
}

Product.prototype.create = function() {
  return new Promise((resolve, reject) => {
    this.cleanUp()
    this.validate()
    if (!this.errors.length) {
      // save Product into database
      ProductsCollection.insertOne(this.data).then((info) => {
        resolve(info.ops[0]._id)
      }).catch(() => {
        this.errors.push("Please try again later.")
        reject(this.errors)
      })
    } else {
      reject(this.errors)
    }
  })
}

Product.prototype.update = function() {
  return new Promise(async (resolve, reject) => {
    try {
      let Product = await Product.findSingleById(this.requestedProductId, this.userid)
      if (Product.isVisitorOwner) {
        // actually update the db
        let status = await this.actuallyUpdate()
        resolve(status)
      } else {
        reject()
      }
    } catch(error) {
      reject()
    }
  })
}

Product.prototype.actuallyUpdate = function() {
  return new Promise(async (resolve, reject) => {
    this.cleanUp()
    this.validate()
    if (!this.errors.length) {
      await ProductsCollection.findOneAndUpdate({_id: new ObjectID(this.requestedProductId)}, {$set: {title: this.data.title, body: this.data.body}})
      resolve("success")
    } else {
      resolve("failure")
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