

export default class ViewProducts {

    constructor() {
        this.productsDataTable = document.querySelector("#dataTable")

        // Get HTML head element 
        this.head = document.getElementsByTagName('HEAD')[0];

        // Create new link Element 
         this.link = document.createElement('link'); 
        
        //  this.script1 = document.createElement('script'); 
        //  this.script2 = document.createElement('script'); 
        //  this.script3 = document.createElement('script'); 
         this.elemArr = []

        this.events()

    }

    // Events

    events() {
    
        // set the attributes for link element  
        this.link.rel = 'stylesheet';  
      
        this.link.type = 'text/css'; 
      
        this.link.href = 'vendor/datatables/dataTables.bootstrap4.min.css'

        // this.script1.src = "vendor/datatables/jquery.dataTables.min.js"
        // this.script2.src = "vendor/datatables/dataTables.bootstrap4.min.js"
        // this.script3.src = "js/demo/datatables-demo.js"

        // if(this.elemArr && this.elemArr !== undefined){
        //     this.elemArr.push(this.script1)
        //     this.elemArr.push(this.script2)
        //     this.elemArr.push(this.script3)
        // }


       

      // Append link element to HTML head 
      //this.injectScript(this.elemArr)
      this.appendElement(this.head, this.link)
      
   
    }

    // Method
     appendElement(containerElem, elem){        
                containerElem.appendChild(elem)
                console.log(containerElem)
        }

    injectScript(scripts){
        scripts.map((script)=>{
            this.productsDataTable.after(script)
        })
        console.log(document.querySelector("body"))
    }
   


}
















 
