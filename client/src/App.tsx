import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductListContainer from './components/ProductListContainer'
import { CreateProductForm } from './components/Forms/CreateProductForm'
import UpdateProductForm from './components/Forms/UpdateProductForm'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' Component={ProductListContainer}/>
        <Route path='/product/create' Component={CreateProductForm}/> 
        <Route path='/product/update/:id' Component={UpdateProductForm}/>
      </Routes>
    </>
  )
}

export default App
