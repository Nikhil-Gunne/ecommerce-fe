import {  useState } from "react"
import { AiOutlineSearch } from "react-icons/ai"
import "./FiltersGroup.css"

const categoryOptions = [
    {
      name: 'Clothing',
      categoryId: '1',
    },
    {
      name: 'Electronics',
      categoryId: '2',
    },
    {
      name: 'Appliances',
      categoryId: '3',
    },
    {
      name: 'Grocery',
      categoryId: '4',
    },
    {
      name: 'Toys',
      categoryId: '5',
    },
  ]
const ratingsList = [
    {
      ratingId: '4',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
    },
    {
      ratingId: '3',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
    },
    {
      ratingId: '2',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
    },
    {
      ratingId: '1',
      imageUrl:
        'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
    },
  ]

const FiltersGroup = (props) =>{
    const {activeCategory,handleCategory,activeRating,handleRating,clearFilters, handleSearch} = props

    const [productSearch,setProductSearch]= useState('')

    

    const changeCategory = (category) =>{

      if(category.toLowerCase()!==activeCategory){
        handleCategory(category.toLowerCase())  
      }
    }

    const changeActiveRating = rating =>{
      if(Number(rating)!==activeRating){
        handleRating(rating)
      }
    }
    
  //   const handleSubmit = event => {
  //     event.preventDefault()
  //     handleSearch(productSearch)
  // }

  const handleClearFilters = () =>{
    setProductSearch('')
    clearFilters()
  
  }

  
    return <div className="filters-container">
      <div className="search-container">
            <input type="search"  value={productSearch} className="search-input" placeholder="search" onChange={(event) => {
              setProductSearch(event.target.value)
              handleSearch(event.target.value)
            }
              } />
            
            <AiOutlineSearch />
        </div>
        <h1 className="category-heading">Category</h1>
        <ul className="category-list">
            {
                categoryOptions.map(category =><li key={category.categoryId} className={activeCategory===category.name.toLowerCase()?"active-category-item":"category-list-item"} onClick={()=>changeCategory(category.name)}>{category.name}</li>)
                
              }
        </ul>
        <h1 className="category-heading">Rating</h1>
        <ul className="category-list">
            {
                ratingsList.map(rating=>{
                    return <li key={rating.ratingId} className="rating-item" onClick={()=>changeActiveRating(rating.ratingId)}>
                        <img src={rating.imageUrl} alt="stars" className="rating-image"/>
                        <span className={Number(activeRating)===Number(rating.ratingId)?"active-rating":""}>&up</span>
                    </li>
                })
            }
        </ul>
        <button className="clear-filters-button" disabled = {activeCategory==="" && activeRating===0 && productSearch===""} onClick={()=>handleClearFilters()}>clear filters</button>
    </div>

}

export default FiltersGroup