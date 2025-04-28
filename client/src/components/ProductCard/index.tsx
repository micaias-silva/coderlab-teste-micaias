
export interface ProductCardProps {
    name: string,
    qty: number,
    price: number,
    photo: string,
    categories: any[]
}

const ProductCard = ({name, price, qty, photo, categories}: ProductCardProps) => {
    return <li>
        <picture>
            <img src={photo} />
        </picture>
        <div>
            <span>{...categories}</span>
            <h4 className="product-name">{name}</h4>
            <p>{price}</p>
            <span>{qty}</span>
            <button>Edit</button>
        </div>
    </li>
}

export default ProductCard