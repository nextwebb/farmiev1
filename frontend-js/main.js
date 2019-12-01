import RegisterAdmin from './modules/adminRegister'
import CreateProduct from './modules/createProduct'

if (document.querySelector('.regForm')){
    new RegisterAdmin()
}
if (document.querySelector('.productForm')){
    new CreateProduct()
}