const sharp = require('sharp')
const uuidv4 = require('uuid/v4')
const path = require('path')

class Resize {
  constructor(folder) {
    this.folder = folder
    this.filename 
  }
   save(buffer) {
    return new Promise(async(resolve, reject)=>{
      this.filename = Resize.filename()
      //const filename =   this.filename
      console.log(this.filename)
      const filepath = this.filepath(this.filename)  
  
       await sharp(buffer)
        .resize(270, 226, {
          fit: sharp.fit.inside,
          withoutEnlargement: true
        })
        .toFile(filepath)
        .then((info) => {
          console.log('success, resized! = '+  this.filename , info)
          // console.log(this)
        

         })
        .catch((err)=>{
          console.log(err)
          return "Invalid image returned"
          reject(err)
        })
        resolve(this.filename)
    })
   
    
    
  }
  static filename() {
    const imgName = `${uuidv4()}.jpg`
    return imgName
    
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize