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
        this._csrf = document.querySelector('[name="_csrf"]').value
        this.editName = document.querySelector("#editName")
        this.editRate = document.querySelector("#editRate")
        this.editDiscount = document.querySelector("#editDiscount")
        this.editQuantity = document.querySelector("#editQuantity")
        this.editCat = document.querySelector("#editCat")
        this.editLocation = document.querySelector("#editLocation")
        this.editDesc = document.querySelector("#editDesc")
        this.editLocation = document.querySelector("#editLocation")
        this.editImage = document.querySelector("#editImage").src
        this.uploadImage = document.querySelector("#uploadImage")



       

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
       
    
    
     

      
   
    }

    // Method
    onfocusHandler() {
        this.showName.innerHTML = `<strong>${this.editName.value}</strong>`
        this.showTitle.innerHTML = `<strong>${this.editName.value}</strong>`
        this.showCat.innerHTML = `<strong>${this.editCat.value}</strong>`
        this.showDesc.innerHTML = `<strong>${this.editDesc.value}</strong>`
        this.sendRequest()
       
        
    }
    sendRequest() {
        axios.post('/admin/updateProduct/', {
            productId:  this.productId,
            _csrf: this._csrf,
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











 
