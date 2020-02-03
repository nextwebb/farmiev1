export default class RegisterAdmin {

    constructor() {
        this.adminRegForm = document.querySelector(".regForm")
        this.events()

    }

    // Events

    events() {
    this.adminRegForm.addEventListener("submit",(e)=>{
        //e.preventDefault()
        //console.log("working!")
      // alert("its working!")

    })

    }

    // Methods
    sendRegFormToServer() {

    }


}