import axios from 'axios'
export default class Services {

    constructor() {
        this.addService = document.querySelector(".addService")
        this.serviceBox = document.querySelector(".allServiceBox")
        this.addServiceForm = document.querySelector(".addServiceForm")
        this.serviceGuestArea = document.querySelector(".serviceGuestArea")
  
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
      if(this.serviceGuestArea){
          this.createElement()
          this.buildServiceArea()
      }
   
  }
    // Methods
    
    toggleAllServices(){
        this.serviceBox.classList.toggle("d-none")
    }
  
    toggleServiceForm(){
        this.addserviceForm.classList.toggle("d-none")
    }

    createElement(){
        this.singleServiceArea = 
        document.createElement("div");
        
        this.servicethumbnail = 
        document.createElement("div");

        this.serviceImg = 
        document.createElement("img");

        this.serviceContent = 
        document.createElement("div");

        this.farmingIcon = 
        document.createElement("div");

        this.serviceSmallText = 
        document.createElement("span");

        this.serviceTitle = 
        document.createElement("h4");

        this.serviceDesc = 
        document.createElement("p");

    }

    buildServiceArea() {
        axios.get("/api/v1/admin-services/viewAllServicesApi").then(
            (services)=>{
                services.forEach(service => {
                    this.singleServiceArea.classList.add("single-farming-practice-area", "mb-50", "wow", "fadeInUp");

      this.singleServiceArea.setAttribute("data-wow-delay", "100ms");

      this.singleServiceArea.insertAdjacentElement("afterbegin", this.servicethumbnail);

      this.servicethumbnail.insertAdjacentElement("afterbegin", this.serviceImg);

      this.singleServiceArea.insertAdjacentElement("beforend", this.serviceContent);

      this.serviceContent.classList.add("farming-practice-content", "text-center");

      this.serviceContent.insertAdjacentElement("afterbegin", this.farmingIcon);

      this.singleServiceArea.insertAdjacentElement("afterbegin", this.serviceSmallText)

      this.singleServiceArea.appendChild(this.serviceTitle);

      this.singleServiceArea.appendChild(this.serviceDesc);

      this. serviceImg.setAttribute("src", `/${data.image}`);
      this.serviceSmallText.innerText='Farming Practice For';
      this.serviceTitle.innerText=`${data.name }`
      this.serviceDesc.innerText=`${data.desc}`
        })
        
    }).catch((err)=>{
        Console.log(err)
    })
   
        

    }
  
    
  
  }