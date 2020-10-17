import axios from 'axios'
export default class Services {

    constructor() {
        this.addService = document.querySelector(".addService")
        this.serviceBox = document.querySelector(".allServiceBox")
        this.addServiceForm = document.querySelector(".addServiceForm")
       
  
        this.events()
  
    }
  
    // Events
  
    events() {
    
  
      if( this.addService){
        this.addService.addEventListener("click",(e)=>{
            e.preventDefault()
           this.toggleAllServices()
           this.toggleServiceForm()
        })
      }  else{
          alert("error")
      }
     
   
  }
    // Methods
    
    toggleAllServices(){
        this.serviceBox.classList.toggle("d-none")
    }
  
    toggleServiceForm(){
        this.addserviceForm.classList.toggle("d-none")
    }

   
    
  
  }