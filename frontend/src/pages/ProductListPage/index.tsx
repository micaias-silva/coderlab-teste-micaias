import { useNavigate } from "react-router-dom";
import ProductListContainer from "../../components/ProductListContainer";

const ProductListPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header>
        <button onClick={() => navigate("/product/create")}>
          Create new product
        </button>
      </header>
      <main>
        <ProductListContainer />
      </main>
    </div>
  );
};

export default ProductListPage;
