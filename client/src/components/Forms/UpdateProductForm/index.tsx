import { useForm } from "react-hook-form";
import { productApi } from "../../../utils/axios";
import { useEffect, useState } from "react";
import InputCategory from "../InputCategory";
import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";
import updateProductSchema from "./form.schema";
import { useParams } from "react-router-dom";
import { Product } from "../../../interfaces/axios.interfaces";

type UpdateProductSchema = yup.InferType<typeof updateProductSchema>;

const UpdateProductForm = () => {
  const [originalProduct, setOriginalProduct] = useState<Product>();

  const { id } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: {
      name: originalProduct?.name || "",
      photo: originalProduct?.photo || "",
      categories: "",
      price: Number(originalProduct?.price) || 0,
      qty: Number(originalProduct?.price) || 0,
    },
    resolver: yupResolver(updateProductSchema),
  });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    productApi
      .get<Product>(`/${id}`)
      .then((res) => {
        setOriginalProduct(res.data);
        setCategories(res.data.categories.map((item) => item.category.name));
      }).catch(err => {console.log(err)})
      
  }, []);


  const onSubmit = (data: UpdateProductSchema) => {
    productApi
      .patch(`/${id}`, { ...data, categories })
      .then(() => console.log("success"))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">Nome do Produto</label>
        <input type="text" {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label htmlFor="qty">Quantity:</label>
        <input
          type="number"
          {...register("qty", {
            valueAsNumber: true,
          })}
        />
        {errors.qty && <p>{errors.qty.message}</p>}
      </div>

      <div>
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            valueAsNumber: true,
          })}
        />
        {errors.price && <p>{errors.price.message}</p>}
      </div>

      <div>
        <label htmlFor="photo">Photo Url:</label>
        <input type="text" {...register("photo")} />
        {errors.photo && <p>{errors.photo.message}</p>}
      </div>

      <div>
        <InputCategory
          categoriesState={categories}
          setCategoriesState={setCategories}
          {...{name: "categories"}}
        />
      </div>
      {errors.categories && <p>{errors.categories.message}</p>}
      <button type="submit">Update Product</button>
    </form>
  );
};

export default UpdateProductForm;
