import { useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/axios.interfaces";
import { numberToCurrency } from "../../utils/general.utils";
import "./style.css";

const ProductCard = ({ id, name, price, qty, photo, categories }: Product) => {
  const navigate = useNavigate();

  return (
    <li id={id} className="product-card">
      <div onClick={() => navigate(`/product/${id}`)}>
        <picture>
          <img src={photo} />
        </picture>
        <div>
          <ul className="category-list">
            {categories.map((item) => (
              <li className="product-card-category">{item.category.name}</li>
            ))}
          </ul>
          <h4 className="product-name">{name}</h4>
          <p className="product-card-price">
            {numberToCurrency(Number(price))}
          </p>
          <span>Units Available: {qty}</span>
        </div>
      </div>
      <button onClick={() => navigate(`/product/update/${id}`)}>Edit</button>
    </li>
  );
};

export default ProductCard;
