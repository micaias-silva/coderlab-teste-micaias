
export interface GetProductNavigationResponse {
    currentPage: number
    previousPage: number | null
    nextPage: number | null
    items: number,
    navigation: Product[]
    pageCount: number
}

export interface Product {
    id: string
    name: string
    qty: number
    price: string
    photo: string
    createdAt: Date
    updatedAt: Date
    categories: ProductCategory[]
}

export interface ProductCategory {
    productId: string
    categoryId: string
    category: Category
}

export interface Category {
    id: string
    name: string
    parentId: string | null
    createdAt: Date
    updatedAt: Date
    parent: Category
}