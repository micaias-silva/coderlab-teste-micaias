import * as yup from "yup";
export const createProductSchema = yup.object({
  name: yup.string().required("Product should be provided with a valid name"),

  qty: yup
    .number()
    .typeError("Product qty should be an integer number")
    .integer("Product qty should be an integer number")
    .min(0, "Product qty should be at least 0")

  price: yup
    .number()
    .typeError("Product price should be a number in format 0 or 0.00")
    .min(0, "Product price should be at least 0")
    .required("Product price is required"),

  photo: yup
    .string()
    .url("Product should be provided with a valid url string")
    .required("Photo URL is required"),

  categories: yup.string(),
});

export default createProductSchema;
