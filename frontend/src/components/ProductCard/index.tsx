import { useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/axios.interfaces";
import { numberToCurrency } from "../../utils/general.utils";
import "./style.css";

const ProductCard = ({ id, name, price, qty, photo, categories }: Product) => {
  const navigate = useNavigate();

const ProductCard = ({name, price, qty, photo, categories}: ProductCardProps) => {
    return <li>
        <picture>
            <img src={photo} />
        </picture>
        <div>
            {/* <span>{...categories}</span> */}
            <h4 className="product-name">{name}</h4>
            <p>{price}</p>
            <span>{qty}</span>
            <button>Edit</button>
        </div>
    </li>
}

export default ProductCard