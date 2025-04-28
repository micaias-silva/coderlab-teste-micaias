import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductListContainer from './components/ProductListContainer'
import { CreateProductForm } from './components/Forms/CreateProductForm'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' Component={ProductListContainer}/>
        <Route path='/product/create' Component={CreateProductForm}/>
      </Routes>
    </>
  )
}

export default App
