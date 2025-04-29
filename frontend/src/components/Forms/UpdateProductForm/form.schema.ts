import * as yup from "yup";

const updateProductSchema = yup.object({
  name: yup
    .string()
    .optional()
    .trim()
    .min(1, "Product should be provided with a valid name"),

  qty: yup
    .number()
    .typeError("Product qty should be an integer number")
    .integer("Product qty should be an integer number")
    .min(0, "Product qty should be at least 0")
    .optional(),

  price: yup
    .number()
    .typeError("Product price should be a number in format 0 or 0.00")
    .min(0, "Product price should be at least 0")
    .optional(),

  photo: yup
    .string()
    .url("Product should be provided with a valid URL string")
    .optional(),

  categories: yup.string().optional(),
});

export default updateProductSchema;
