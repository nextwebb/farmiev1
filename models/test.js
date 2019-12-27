Product.prototype.actuallyUpdate = function() {
    return new Promise(async (resolve, reject) => {
      this.cleanUp()
      
        await ProductsCollection.findOneAndUpdate(
        {_id: new ObjectID(this.data.productId)}, 
        {$set: {
           name: this.data.name,
           catName: this.data.catName,
           quantity: this.data.quantity,
           rate: this.data.rate,
           discount:this.data.discount,
           location:this.data.location,
           desc: this.data.desc,
           createdDate: new Date()
             }},  
        { returnOriginal: false},{ new: true } ).then((updatedDocument) => {
          if(updatedDocument) {
            resolve(`Successfully updated document`)
          } else {
            reject("No document matches the provided query.")
          }
  
        }) .catch((err) => {
          reject(`Failed to find and update document`)
        })
       
    })
  }