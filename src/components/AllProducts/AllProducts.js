import FiltersGroup from "../FiltersGroup/FiltersGroup"
import ProductsHeader from "../ProductsHeader/ProductsHeader"
import { useState,useEffect } from "react"
import "./AllProducts.css"
import ProductCard from "../ProductCard/ProductCard"
import LoaderComponent from "../Loader/Loader"

const AllProducts = () =>{

    const [productsList,setProductsList] = useState([])

    const [activeSortByOption,setActiveSortByOption] =useState('High-Low')

    const [activeCategory,setActiveCategory] = useState('')

    const [activeRating,setActiveRating] = useState(0)
    
    const [searchInput,setSearch] = useState("")
    
    const [isLoading,setLoading] = useState(true)
    
    const user = JSON.parse(localStorage.getItem("user"))

    const URL ="https://ecommerce-api-ws77.onrender.com"
    //"http://localhost:4000"

    const handleSortBy = (opt) =>{
        setActiveSortByOption(opt)
        setLoading(true)
    }

    const handleCategory = (category) => {
        setActiveCategory(category)
        setLoading(true)
    }

    const handleRating = (rating) => {
        setActiveRating(Number(rating))
        setLoading(true)
    }

    const handleSearch = (productName) =>{
        setSearch(productName)
    }

    const clearFilters = () =>{
        setActiveRating(0)
        setActiveCategory('')
        setSearch('')
        setLoading(true)
    }

    useEffect(()=>{
        const fetchProducts = async() =>{
            const options={
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization": `Bearer ${user.token}`
                }
            }
            const response = await fetch(`${URL}/api/products?sort_by=${activeSortByOption}&category=${activeCategory}&rating=${activeRating}&search_q=${searchInput}`,options)
            const jsonResponse = await response.json()
            if(response.ok){
                setProductsList([...jsonResponse])
                setLoading(false)
            }
        }
        

        let timerId = setTimeout(()=>fetchProducts(),1000)
        return ()=>{
        
            clearTimeout(timerId)
        }
    },[activeSortByOption,activeCategory,activeRating,searchInput,user.token])
    


    const renderNoProductsView = () =><div className="no-products-found-container">
        <img src="https://stores.lifestylestores.com/VendorpageTheme/Enterprise/EThemeForLifestyleUpdated/images/product-not-found.jpg" alt = "no products"/> 
        <p>Your search did not match any products.
            <br />
            Please try again.
        </p>
    </div>

    return <div className="products-content-container">
    <div className="products-bottom-container">
        
        <FiltersGroup  handleSearch={handleSearch} searchInput={searchInput} clearFilters={clearFilters} activeCategory={activeCategory} handleCategory={handleCategory} activeRating={activeRating} handleRating={handleRating}/>
        <div className="products-header-and-products-container">
        <ProductsHeader  handleSortBy={handleSortBy} activeSortByOption={activeSortByOption}/>
        {isLoading?(<div className="products-loader-container">
            <LoaderComponent />
            </div>):productsList.length>0?(<ul className="products-list">
            {
                productsList.map(product=>{
                    return <ProductCard product={product} key={product.id}/>
                })
            }
        </ul>): renderNoProductsView()}
        </div>
        
    </div>
</div>

}

export default AllProducts