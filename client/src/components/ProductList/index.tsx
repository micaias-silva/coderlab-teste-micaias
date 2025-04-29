import { Product } from "../../interfaces/axios.interfaces";
import ProductCard from "../ProductCard";

interface ProductListProps {
  products: Product[]
}

const ProductList = ({products}: ProductListProps) => {
  return (
    <div>
      <ul>{products.map(item => {
        return <ProductCard {...item}/>
      })}</ul>
    </div>
  );
};

export default ProductList;
