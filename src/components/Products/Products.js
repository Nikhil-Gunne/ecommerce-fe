import AllProducts from "../AllProducts/AllProducts"
import Navbar from "../Navbar/Navbar"
import "./Products.css"


function Products() {
    return <div className="products-container">
        <Navbar />
        <hr />
        <AllProducts />
    </div>
}

export default Products