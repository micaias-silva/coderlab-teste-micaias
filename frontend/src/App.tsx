import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CreateProductForm } from "./components/Forms/CreateProductForm";
import UpdateProductForm from "./components/Forms/UpdateProductForm";
import ProductPage from "./pages/ProductPage";
import ProductListPage from "./pages/ProductListPage";
import FormPage from "./pages/FormPage/FormPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={ProductListPage} />
        <Route
          path="/product/create"
          element={
            <FormPage>
              <CreateProductForm />
            </FormPage>
          }
        />
        <Route
          path="/product/update/:id"
          element={
            <FormPage>
              <UpdateProductForm />
            </FormPage>
          }
        />
        <Route path="/product/:id" Component={ProductPage} />
      </Routes>
    </>
  );
}

export default App;
