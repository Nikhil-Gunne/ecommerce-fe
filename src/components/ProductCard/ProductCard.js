import {Link} from "react-router-dom"
import {AiFillStar} from "react-icons/ai"
import "./ProductCard.css"

const ProductCard = ({product}) =>{
    const {image_url,title,brand,price,rating,id} = product
    return <li className="product-card">
        <Link to={`/products/${id}`} style={{'textDecoration':"none"}}>
        <img src={image_url} alt={title} className="product-image"/>
        <div className="product-info">
            <h3 className="title-text">{title}</h3>
            <p className="brand-name-text">by {brand}</p>
            <div className="price-and-rating-container">
                <p className="price-text"><span><strong>Rs</strong></span>  {price}/-</p>
                <div className="rating-container">
                    <p className="rating-text">{rating}</p>
                    <AiFillStar color="#ffffff"/>
                </div>
            </div>
        </div>
    </Link>
    </li>
}


export  default ProductCard