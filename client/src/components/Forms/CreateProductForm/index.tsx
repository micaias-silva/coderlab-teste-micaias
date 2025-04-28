import { useForm } from "react-hook-form";
import { CreateProduct } from "../../../interfaces/axios.interfaces";
import { productApi } from "../../../utils/axios";
import { useState } from "react";

export function CreateProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProduct>({
    defaultValues: {
      name: "",
      qty: 0,
      price: 0,
      photo: "",
    },
  });

  const [categories, setCategories] = useState<string[]>([])

  const onSubmit = (data: CreateProduct) => {
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

      <button type="submit">Create Product</button>
    </form>
  );
}
