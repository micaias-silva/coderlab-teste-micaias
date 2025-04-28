import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductListContainer from './components/ProductListContainer'

function App() {


  return (
    <>
      <Routes>
        <Route path='/' Component={ProductListContainer}/>
      </Routes>
    </>
  )
}

export default App
