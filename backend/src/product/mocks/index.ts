import { exec } from 'child_process';
import { CreateProductDto } from '../dto/create-product.dto';


export const mockedValidProduct: CreateProductDto = {
  name: 'GeForce RTX 5090',
  qty: 10,
  price: 1999.99,
  categories: ['Placas de Vídeo', 'Hardware'],
  photo:
    'https://www.adrenaline.com.br/wp-content/uploads/2024/12/geforce-rtx-5090.jpg',
};

export const mockedEmptyProduct: CreateProductDto = {
  name: '',
  qty: 0,
  price: 0.0,
  categories: [],
  photo: '',
};

export const mockedWrongTypedProduct: any = {
  name: 123,
  qty: 'ten',
  price: 'expensive',
  categories: 'Placas de Vídeo',
  photo: true,
};

export const mockedNonexistentCategoryProduct: CreateProductDto = {
  name: 'Unknown Product',
  qty: 5,
  price: 499.99,
  categories: ['Categoria Inexistente'],
  photo:
    'https://www.adrenaline.com.br/wp-content/uploads/2024/12/geforce-rtx-5090.jpg',
};

interface ProductToFind extends CreateProductDto {
  id: string
}

export const mockedProductToFind: ProductToFind = {
  id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  name: 'GeForce RTX 5090',
  qty: 10,
  price: 1999.99,
  categories: [],
  photo:
    'https://www.adrenaline.com.br/wp-content/uploads/2024/12/geforce-rtx-5090.jpg',
}
