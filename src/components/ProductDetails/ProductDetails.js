import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import {AiFillStar,AiOutlineMinusSquare,AiOutlinePlusSquare} from "react-icons/ai"
import Navbar from "../Navbar/Navbar"
import "./ProductDetails.css"
import ProductCard from "../ProductCard/ProductCard"
import useCartContext from "../../Hooks/useCartContext"
import LoaderComponent from "../Loader/Loader"


const ProductDetails = () =>{
    const [product,setProduct] = useState({})

    const [quantity,setQuantity] = useState(1)

    const [isLoading,setisLoading] = useState(true)

    const context = useCartContext()
    
    const {cartList,dispatch} = context
    // console.log(context)

    const user = JSON.parse(localStorage.getItem('user'))
    
    const {user_id} = user
    const {productId} = useParams()
    useEffect(()=>{
        // console.log(productId)
        const fetchProduct = async () =>{
            const options = {
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            }
            const response =  await fetch(`https://ecommerce-api-ws77.onrender.com/api/products/${productId}`,options)
            const jsonResponse =  await response.json()
            if (response.ok){
                setProduct(jsonResponse)
                setisLoading(false)
            }
        }
        fetchProduct()
    },[productId,user.token])
    // console.log(product)

    const handleAddToCart = async () =>{
        const itemObj = {
            _id: user_id,
            image_url:product.image_url,
            quantity,
            price:product.price,
            product_id:product._id,
            title:product.title,
            brand:product.brand
        }
        const itemPresent = cartList.find(item=>item.product_id===itemObj.product_id)
        if(itemPresent){
            const updatedCartList = cartList.map(item=>{
                if(item.product_id===itemObj.product_id){
                    return {...item,quantity:item.quantity+quantity}
                }
                return item
            })
            const options = {
                method:"PUT",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${user.user_id}`
                },
                body:JSON.stringify({product_id:itemObj.product_id,quantity})
            }

            const response =  await fetch(`https://ecommerce-api-ws77.onrender.com/api/user/change-quantity/${user_id}`,options)
            // console.log(jsonResponse)
            if(response.ok){
                dispatch({type:"ADD_ITEMS_TO_CART",payload:updatedCartList})
                setQuantity(1)
            }
        }
        else{
            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${user.user_id}`
                },
                body:JSON.stringify(itemObj)
            }
    
            const response = await fetch("https://ecommerce-api-ws77.onrender.com/api/user/add-to-cart",options)
            const jsonResponse = await response.json()
            console.log(jsonResponse)
            setQuantity(1)
            if(response.ok){
                dispatch({type:"ADD_TO_CART",payload:itemObj})
            }
        }
        
    }

    const handleIncreaseQuantity = () =>setQuantity(quantity+1)

    const handleDecreaseQuantity = () =>setQuantity(quantity-1)

    
    const {image_url,title,price,total_reviews,rating,description,availability,brand,similar_products} = product
    return <div className="product-details-container">
        <Navbar />
        <hr />
        {isLoading?(<LoaderComponent />):(
        <>
        <div className="product-info-container">
            <img src={image_url} alt="productimage" className="product-item-image"/>
            <div className="product-item-details-container">
                <h1 className="product-details-title-text">{title}</h1>
                <p className="product-details-price-text"><span><strong>Rs {price}/-</strong></span></p>
                <div className="rating-reviews-container">
                    <div className="rating-container">
                        <p className="rating-text">{rating}</p>
                        <AiFillStar color="#ffffff"/>
                    </div>
                    <p className="reviews-text">{total_reviews} <strong>Reviews</strong></p>
                </div>
                <p className="description-text">{description}</p>
                <p className="available-text"><strong>Available:</strong> <span> {availability}</span></p>
                <p className="available-text"><strong>Brand:</strong> <span> {brand}</span></p>
                <hr />
                <div className="quantity-and-buttons-container">
                    <button className="quantity-button" disabled={quantity===1} onClick={handleDecreaseQuantity}><AiOutlineMinusSquare size={25} /></button>
                    <p>{quantity}</p>
                    <button className="quantity-button"  onClick={handleIncreaseQuantity}><AiOutlinePlusSquare size={25} /></button>
                </div>
                <button className="add-to-cart-button" onClick={handleAddToCart} >Add to cart</button>
            </div>
        </div>
        <div className="similar-products-container">
            <h1 className="similar-products-heading">Similar products</h1>
            {similar_products&& <ul className="similar-products-list">
                {
                    similar_products.map(eachProduct =><ProductCard  key={eachProduct.id} product={eachProduct}/>)
                }
            </ul>
}
        </div>
        </>)}
        
    </div>
}

export default ProductDetails