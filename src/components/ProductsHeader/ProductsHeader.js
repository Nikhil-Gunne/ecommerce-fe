import { MdOutlineSort } from "react-icons/md"
import "./ProductsHeader.css"

const ProductsHeader = (props) => {
    const { handleSortBy, activeSortByOption } = props
    
   

    const handleOption = (event) => {
        handleSortBy(event.target.value)
    }

    
    return <div className="products-header">
        <div className="products-heading-and-sort-container">
            <h1 className="all-products-heading">All products</h1>
            <div className="sort-by-price-container">
                <MdOutlineSort style={{ "margin": "0" }} />
                <p className="sort-by-text">Sort by</p>
                <select className="drop-down" value={activeSortByOption} onChange={handleOption}>
                    <option value={'High-Low'}>Price (High-Low)</option>
                    <option value={'Low-High'}>Price (Low-High)</option>
                </select>
            </div>
        </div>
    </div>

}

export default ProductsHeader