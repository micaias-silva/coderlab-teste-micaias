import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductListContainer from './components/ProductListContainer'
import { CreateProductForm } from './components/Forms/CreateProductForm'
import UpdateProductForm from './components/Forms/UpdateProductForm'
import ProductPage from './pages/ProductPage'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' Component={ProductListContainer}/>
        <Route path='/product/create' Component={CreateProductForm}/> 
        <Route path='/product/update/:id' Component={UpdateProductForm}/>
        <Route path='/product/:id' Component={ProductPage}/>
      </Routes>
    </>
  )
}

export default App
