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

export function CreateProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      qty: 0,
      price: 0,
      photo: "",
    },
    resolver: yupResolver(createProductSchema)
  });

  const [categories, setCategories] = useState<string[]>([])

  const onSubmit = (data: CreateFormValues) => {
    productApi
      .post("/", { ...data, categories })
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
        <InputCategory setCategoriesState={setCategories} {...register("categories")}/>
      </div>
      {errors.categories && <p>{errors.categories.message}</p>}
      <button type="submit">Create Product</button>
    </form>
  );
}
