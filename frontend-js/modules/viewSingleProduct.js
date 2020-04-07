import axios from 'axios'

export default class ViewSingleProduct {

    constructor() {
        this.showTitle = document.querySelector("#showTitle")
        this.showName = document.querySelector("#showName")
        this.showCat = document.querySelector("#showCat")
        this.showCreatedDate = document.querySelector("#showCreatedDate")
        this.showDesc = document.querySelector("#showDesc")
        this.updated = new Date()
        this.productId = document.querySelector('[name="productId"]').value
       
       

       
       

        //forms input selector
        this.mainEditForm = document.querySelector("#mainEditForm")
        this._csrf = document.querySelector('[name="_csrf"]')
        this.upload_csrf = document.querySelector('#uploadcsrf')
        this.editName = document.querySelector("#editName")
        this.editRate = document.querySelector("#editRate")
        this.editDiscount = document.querySelector("#editDiscount")
        this.editQuantity = document.querySelector("#editQuantity")
        this.editCat = document.querySelector("#editCat")
        this.editLocation = document.querySelector("#editLocation")
        this.editDesc = document.querySelector("#editDesc")
        this.editLocation = document.querySelector("#editLocation")
        this.editImage = document.querySelector("#editImage").src
        this.imagefile = document.querySelector('#imageUpload')
       
        this.events()

    }

    // Events

    events() {
        this.editName.addEventListener("focusout", () => this.onfocusHandler())
        this.editRate.addEventListener("focusout", () => this.onfocusHandler())
        this.editDiscount.addEventListener("focusout", () => this.onfocusHandler())
        this.editQuantity.addEventListener("focusout", () => this.onfocusHandler())
        this.editCat.addEventListener("focusout", () => this.onfocusHandler())
        this.editLocation.addEventListener("focusout", () => this.onfocusHandler())
        this.editDesc.addEventListener("focusout", () => this.onfocusHandler())
        this.editLocation.addEventListener("focusout", () => this.onfocusHandler())
        this.imagefile.addEventListener('change', event => {
           this.handleImageUpload(event)
          
        })
         //To include the CSRF token in all your request just do that 
       axios.defaults.headers.post['X-CSRF-Token'] = this._csrf.value
       
    
    
     

      
   
    }

    // Method
    onfocusHandler() {
        this.showName.innerHTML = `<strong>${this.editName.value}</strong>`
        this.showTitle.innerHTML = `<strong>${this.editName.value}</strong>`
        this.showCat.innerHTML = `<strong>${this.editCat.value}</strong>`
        this.showDesc.innerHTML = `<strong>${this.editDesc.value}</strong>`
        this.sendRequest()
       
        
    }

     handleImageUpload(event){
       //console.log(event.target.files)
       this.files = event.target.files
       this.formData = new FormData()
     
       console.log(this.files[0])
     
      // //upload image file
       this.formData.append('uploads', this.files[0]) 

       axios.post(`/admin/upload_file/${this.productId}`, 
        this.formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    }).then(()=>{
      //You need to do the page change on the client side.
      window.location = `/admin/update-single-product/${this.productId}`; 
    }). catch(()=>{
      console.log("error occured during upload!")
    })
      
  }

    sendRequest() {
        axios.post('/admin/updateProduct/', {
            productId:  this.productId,
            _csrf: this._csrf.value,
             name: this.editName.value, 
             rate: this.editRate.value,
             discount: this.editDiscount.value,
             quantity: this.editQuantity.value,
             catName: this.editCat.value,
             location: this.editLocation.value,
             desc: this.editDesc.value,
             image: this.editImage,
             updated :  this.updated

         })
        .then(response => {
          console.log(response.data)
         
        }).catch(() => {
          alert("Hello, the request failed.")
        })
      }
   


}











 
