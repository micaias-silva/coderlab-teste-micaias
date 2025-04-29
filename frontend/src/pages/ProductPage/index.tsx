import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../../interfaces/axios.interfaces";
import { productApi } from "../../utils/axios";
import { numberToCurrency } from "../../utils/general.utils";

const ProductPage = () => {
  const { id } = useParams();
  const [productDeletedState, setProductDeletedState] = useState(false);
  const [productNotFoundState, setProductNotFoundState] = useState(false);

  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate();
  const handleDelete = () => {
    productApi
      .delete(`/${id}`)
      .then(() => {
        setProductDeletedState(true);
      })
      .catch();
  };

  useEffect(() => {
    productApi
      .get<Product>(`/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        setProductNotFoundState(true);
      });
  });

  return (
    <main>
      <Link to="/">Go back</Link>
      {!productDeletedState ? (
        !productNotFoundState ? product && (
          <section>
            <h1>{product.name}</h1>
            <ul>
              {product.categories.map((item) => (
                <li>{item.category.name}</li>
              ))}
            </ul>
            <picture>
              <img src={product.photo} width={200} height={200} />
            </picture>
            <p>{numberToCurrency(Number(product.price))}</p>
            <button
              onClick={() => {
                navigate(`/product/update/${id}`);
              }}
            >
              Edit
            </button>
            <button onClick={handleDelete}>Delete</button>
            <p>Available unities: {product.qty}</p>
          </section>
        ) : <h2>Product not found</h2>
      ) : (
        <h2>This product has been deleted</h2>
      )}
    </main>
  );
};

export default ProductPage;
