export default class CreateProduct {

    constructor() {
        this.createProduct = document.querySelector(".productForm")
        this.newProductButton = document.querySelector(".newProduct")
        this.events()

    }

    // Events

    events() {
        //submit form
        this.createProduct.addEventListener("submit",(e)=>{ 
            e.preventDefault()
           //this.formSubmitHandler()
           console.log(e)
        })

       // Add the following code if you want the name of the file appear on select
        $(".custom-file-input").on("change", function() {
            var fileName = $(this).val().split("\\").pop();
            $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
          });

          
          this.newProductButton.addEventListener("click", ()=>{
            this.showProductForm()
         })

         this.username.addEventListener("keyup", () => {
            this.isDifferent(this.username, this.usernameHandler)
          })
          this.email.addEventListener("keyup", () => {
            this.isDifferent(this.email, this.emailHandler)
          })
          this.password.addEventListener("keyup", () => {
            this.isDifferent(this.password, this.passwordHandler)
          })
          this.username.addEventListener("blur", () => {
            this.isDifferent(this.username, this.usernameHandler)
          })
          this.email.addEventListener("blur", () => {
            this.isDifferent(this.email, this.emailHandler)
          })
          this.password.addEventListener("blur", () => {
            this.isDifferent(this.password, this.passwordHandler)
          })
       }
       
      

   

    // Methods
    formSubmitHandler() {
        this.usernameImmediately()
        this.usernameAfterDelay()
        this.emailAfterDelay()
        this.passwordImmediately()
        this.passwordAfterDelay()
    
        if (
            this.username.isUnique &&
            !this.username.errors &&
            this.email.isUnique &&
            !this.email.errors &&
            !this.password.errors
          ) {
          this.form.submit()
        }
    
      }

    

    showProductForm() {
        this.createProduct.classList.toggle("d-none")
    }


}