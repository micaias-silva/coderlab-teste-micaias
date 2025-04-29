import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Product } from "../../interfaces/axios.interfaces";
import { productApi } from "../../utils/axios";

const ProductPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<Product>();
  const navigate = useNavigate()

  useEffect(() => {
    productApi
      .get<Product>(`/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <main>
        <Link to="/" >Go back</Link>
      {product && (
        <section>
          <h1>{product.name}</h1>
          <ul>
            {product.categories.map(item => <li>{item.category.name}</li>)}
          </ul>
          <picture>
            <img src={product.photo} width={200} height={200} />
          </picture>
          <p>
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(Number(product.price))}
          </p>
          <button onClick={() => {
            navigate(`/product/update/${id}`)
          }}>Edit</button>
        <p>Available unities: {product.qty}</p>
        
        </section>
      )}
    </main>
  );
};

export default ProductPage;
