import RegisterAdmin from './modules/adminRegister'
import CreateProduct from './modules/createProduct'
import ViewProducts from './modules/viewProducts'
import ViewSingleProduct from './modules/viewSingleProduct'
import Services from './modules/Services'
import GuestService from './modules/guestServices'

if (document.querySelector('.regForm')){
    new RegisterAdmin()
} 
if (document.querySelector('.productForm')){
    new CreateProduct()
} 
if (document.querySelector('#dataTable')){
    new ViewProducts()
}
if (document.querySelector('#singleProduct')){
    new ViewSingleProduct()
}
if (document.querySelector('.addService')){
    new Services()
}
if (document.querySelector('.serviceGuestArea')){
    new GuestService()
}