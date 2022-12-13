import { useContext } from "react"
import { cartContext } from "../context/cartContextProvider"

const useCartContext = () =>{
    const context = useContext(cartContext)
    // console.log(context)
    if(!context){
        throw Error('cannot use outside component')
    }
    return context
}

export default useCartContext