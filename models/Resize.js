const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
  constructor(folder) {
    this.folder = folder;
  }
   save(buffer) {
    const filename = Resize.filename();
    const filepath = this.filepath(filename);

     sharp(buffer)
      .resize(270, 350, {
        fit: sharp.fit.inside,
        withoutEnlargement: true
      })
      .toFile(filepath)
      .then(function(info) {
        console.log('success, resized!', info);
        return filename;
      })
      .catch((err)=>{
        console.log(err);
        return "Invalid image returned"
      })
    
    
  }
  static filename() {
    return `${uuidv4()}.jpg`;
  }
  filepath(filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}
module.exports = Resize;