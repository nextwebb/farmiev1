import RegisterAdmin from './modules/adminRegister'
import CreateProduct from './modules/createProduct'
import ViewProducts from './modules/viewProducts'

if (document.querySelector('.regForm')){
    new RegisterAdmin()
} 
if (document.querySelector('.productForm')){
    new CreateProduct()
}
if (document.querySelector('#dataTable')){
    new ViewProducts()
}