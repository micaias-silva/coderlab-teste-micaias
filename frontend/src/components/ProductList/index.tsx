import { Product } from "../../interfaces/axios.interfaces";
import ProductCard from "../ProductCard";
import "./style.css"

interface ProductListProps {
  products: Product[]
}

const ProductList = ({products}: ProductListProps) => {
  return (
    <div>
      <ul className="product-list">{products.map(item => {
        return <ProductCard {...item}/>
      })}</ul>
    </div>
  );
};

export default ProductList;
