import { createContext, useReducer } from "react";
export const cartContext = createContext()


const cartReducer = (state,action) =>{
    switch(action.type){
        case "ADD_TO_CART":
            return {cartList:[...state.cartList,action.payload]}

        case "ADD_ITEMS_TO_CART":
            return {cartList:[...action.payload]}
        case "DELETE_FROM_CART":
            const filteredList =state.cartList.filter(item=>{
                // console.log(action.payload,item.product_id)
                return item.product_id!==action.payload
            })
            //console.log(filteredList)
            return {cartList:filteredList}
        case "CLEAR_CART":
            return {cartList:action.payload}
        default:
            return state
    }
}

export const CartContextProvider = ({children}) =>{
    const [state,dispatch] = useReducer(cartReducer,{cartList:[]})
    // console.log(state.cartList)
    

    return <cartContext.Provider value={{...state,dispatch}}>
        {children}
    </cartContext.Provider>
}