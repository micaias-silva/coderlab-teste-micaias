import { useNavigate } from "react-router-dom";
import ProductListContainer from "../../components/ProductListContainer";
import "./style.css";

const ProductListPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="product-list-page-header">
        <div className="header-container">
          <button onClick={() => navigate("/product/create")}>
            Create new product
          </button>
        </div>
      </header>
      <main>
        <ProductListContainer />
      </main>
    </div>
  );
};

export default ProductListPage;
