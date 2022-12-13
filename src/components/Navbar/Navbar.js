import { useUserContext } from "../../Hooks/useUserContext"
import useCartContext from "../../Hooks/useCartContext"
import { Link } from "react-router-dom"
import { FiLogOut } from "react-icons/fi"
import "./Navbar.css"

const Navbar = () => {
    const { dispatch } = useUserContext()

    const { cartList, dispatch: cartDispatch } = useCartContext()



    const handleLogout = () => {
        dispatch({ type: "LOG_OUT" })
        cartDispatch({ type: "CLEAR_CART", payload: [] })
        localStorage.removeItem("user")
        // console.log(1);
    }

    return <>
        <div className="nav-bar">
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo" className="nav-logo" />
            <ul className="nav-list">
                <Link to="/" style={{ "textDecoration": "none" }}><li className="nav-list-items">Home</li></Link>
                <Link to="/products" style={{ "textDecoration": "none" }}><li className="nav-list-items">Products</li></Link>
                <Link to="/cart" style={{ "textDecoration": "none" }}><li className="nav-list-items">Cart {cartList.length > 0 && <span className="cart-count-badge">{cartList.length}</span>}</li></Link>

                <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
            </ul>
            <button className="mobile-logout-button" onClick={handleLogout}><FiLogOut size={20} /></button>
        </div>
        <div className="nav-menu-mobile">
            <ul className="nav-menu-list-mobile">
                <li className="nav-menu-item-mobile">
                    <Link to="/" className="nav-link">
                        <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                            alt="nav home"
                            className="nav-bar-img"
                        />
                    </Link>
                </li>

                <li className="nav-menu-item-mobile">
                    <Link to="/products" className="nav-link">
                        <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                            alt="nav products"
                            className="nav-bar-img"
                        />
                    </Link>
                </li>
                <li className="nav-menu-item-mobile">
                    <Link to="/cart" className="nav-link">
                        <img
                            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                            alt="nav cart"
                            className="nav-bar-img"
                        />
                        {cartList.length>0 && <><span className="cart-count-badge">{cartList.length}</span></>}
                    </Link>
                </li>
            </ul>
        </div>
    </>

}


export default Navbar