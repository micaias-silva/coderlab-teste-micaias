import { useNavigate } from "react-router-dom";
import { Product } from "../../interfaces/axios.interfaces";
import { numberToCurrency } from "../../utils/general.utils";
import "./style.css";
import { productApi } from "../../utils/axios";
import { useContext } from "react";
import { ProductContext } from "../../providers/ProductContext";

const ProductCard = ({ id, name, price, qty, photo, categories }: Product) => {
  const navigate = useNavigate();
  const {triggerProductListUpdate} = useContext(ProductContext)
  
  const handleDelete = () => {
    productApi.delete(`/${id}`).then(() => console.log("sucess")) 
    triggerProductListUpdate()
  }


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
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

export default ProductCard;
