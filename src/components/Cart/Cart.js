import { useEffect, useState } from "react"
import {toast} from "react-toastify"
import { AiOutlinePlusSquare, AiOutlineMinusSquare, AiFillCloseCircle } from "react-icons/ai"
import useCartContext from "../../Hooks/useCartContext"
import EmptyCartView from "../EmptyView"
import LoaderComponent from "../Loader/Loader"
import Navbar from "../Navbar/Navbar"
import "./Cart.css"

const Cart = () => {

    const user = JSON.parse(localStorage.getItem('user'))

    // console.log(user)

    const context = useCartContext()

    const [isLoading, setLoading] = useState(true)

    const { cartList, dispatch } = context

    const URL ="https://ecommerce-api-ws77.onrender.com"

    //"http://localhost:4000"

    useEffect(() => {
        const fetchCartItems = async () => {
            const options = {
                method:"GET",
                headers:{
                    "Authorization": `Bearer ${user.token}`,
                    "Content-Type":"application/json"
                }
            }
            const response = await fetch(`${URL}/api/cart/get-cart-items/${user.user_id}`,options)
            const jsonResponse = await response.json()
            if (response.ok) {
                dispatch({ type: "ADD_ITEMS_TO_CART", payload: [...jsonResponse.userCart] })
                setLoading(false)
            }
        }
        fetchCartItems()
    }, [user.user_id, dispatch,user.token])
    //function removes product from the cart
    const handleDelete = async (id) => {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ id })
        }

        const response = await fetch(`${URL}/api/cart/delete-cart-item/${user.user_id}`, options)
        if (response.ok) {
            dispatch({ type: "DELETE_FROM_CART", payload: id })
            toast.warning('product removed from cart')
        }
    }

    const handleIncreaseQuantity = async (id) => {
        const updatedCartList = cartList.map(item => {
            if (item.product_id === id) {
                return { ...item, quantity: item.quantity + 1 }
            }
            return item
        })
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify({ product_id: id, quantity: 1 })
        }

        const response = await fetch(`${URL}/api/cart/change-quantity/${user.user_id}`, options)
        // console.log(jsonResponse)
        if (response.ok) {
            dispatch({ type: "ADD_ITEMS_TO_CART", payload: updatedCartList })
        }
    }

    const handleDecreaseQuantity = async (id, quantity) => {
        if (quantity > 1) {
            const updatedCartList = cartList.map(item => {
                if (item.product_id === id) {
                    return { ...item, quantity: item.quantity - 1 }
                }
                return item
            })
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({ product_id: id, quantity: -1 })
            }

            const response = await fetch(`${URL}/api/cart/change-quantity/${user.user_id}`, options)
            // console.log(jsonResponse)
            if (response.ok) {
                dispatch({ type: "ADD_ITEMS_TO_CART", payload: updatedCartList })
            }
        }
        else {
            handleDelete(id)
        }
    }

    const handleClearCart = async () => {
        const options = {
            method: "DELETE",
            headers:{
                "Authorization": `Bearer ${user.token}`
            }
        }

        const response = await fetch(`${URL}/api/cart/empty-cart/${user.user_id}`, options)
        if (response.ok) {
            dispatch({ type: "CLEAR_CART", payload: [] })
            toast.warning("Products removed from the cart")
        }
    }

    let TotalPrice = 0
    cartList.forEach(eachCartItem => {
        TotalPrice += eachCartItem.price * eachCartItem.quantity
    })


    return <div className="cart-main-container">
        <Navbar />
        <hr />
        <div className="cart-items-container">
            {isLoading ? (<LoaderComponent />) : 
            cartList.length===0?<EmptyCartView />:
            (<>
                {cartList.length>0&&<h1 className="my-cart-heading">My Cart</h1>}
                <ul className="cart-items-list">
                    {cartList.length > 0 && <li className="remove-all-text-list-item"><button className="remove-all-text" onClick={handleClearCart}>Remove All</button></li>}
                    {
                        cartList.length > 0 && cartList.map(item => <li key={item.product_id} className="cart-list-item">
                            <div className="image-container">
                                <img src={item.image_url} alt="cartitem" className="item-image" />
                                <div className="desktop-title-and-brand-text">
                                    <p className="cart-item-name-text">{item.title}</p>
                                    <p className="cart-item-brand-text">by {item.brand}</p>
                                </div>
                            </div>
                            <div className="buttons-and-price-container">
                                <div className="mobile-title-and-brand-container">
                                    <p className="cart-item-name-mobile-text">{item.title}</p>
                                    <p className="cart-item-brand-mobile-text">by {item.brand}</p>
                                </div>
                                <div className="quantity-and-buttons-container">
                                    <button className="quantity-button" onClick={() => handleDecreaseQuantity(item.product_id, item.quantity)}><AiOutlineMinusSquare size={20} /></button>
                                    <p className="cart-list-item-quantity">{item.quantity}</p>
                
                                    <button className="quantity-button" onClick={() => handleIncreaseQuantity(item.product_id)}  ><AiOutlinePlusSquare size={20} /></button>
                                </div>
                                <div className="mobile-remove-button-container">
                                <p className="cart-price-text">Rs {item.price * item.quantity} /-</p>
                                <span className="mobile-remove-button-container-span" onClick={()=>handleDelete(item.product_id)}>Remove</span>
                                </div>
                                <button className="close-button" onClick={() => handleDelete(item.product_id)}><AiFillCloseCircle /></button>
                            </div>
                        </li>)
                    }
                    <div className="cart-summary-container">
                            <h1 className="total-price-text">
                                Order Total: <span className="span-text">Rs {TotalPrice}/-</span>
                            </h1>
                            <p className="items-in-cart-text">{cartList.length} items in cart</p>
                            <button type="button" className="checkout-button">
                                Checkout
                            </button>
                    </div>
                    
                </ul>
                 
                    
            </>)}
        </div>
    </div>
}


export default Cart