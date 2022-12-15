import { useState } from "react"
import { useUserContext } from "./useUserContext"
import useCartContext from "./useCartContext"
import { toast } from 'react-toastify';


const useLogin = () =>{

    const [emptyFields,setEmptyFields] = useState([])

    const context = useUserContext()

    const {dispatch} = context

    const {dispatch:cartDispatch} = useCartContext()

    // "http://localhost:4000"
    const URL = "https://ecommerce-api-ws77.onrender.com"


    const login = async(email,password)=>{
        const user={email,password}
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        }
        const response = await fetch(`${URL}/api/user/login`,options)
        const jsonResponse = await response.json()
        // console.log(response,jsonResponse)
        if(response.ok){
            toast.success('login successful')
            localStorage.setItem("user",JSON.stringify(jsonResponse))
            const fetchCartItems = async () => {
                const response = await fetch(`${URL}/api/user/get-cart-items/${jsonResponse.user_id}`)
                const jsonResponse1 = await response.json()
                if (response.ok) {
                    cartDispatch({ type: "ADD_ITEMS_TO_CART", payload: [...jsonResponse1.userCart] })
                }
            }
            fetchCartItems()
            dispatch({type:"LOGIN",payload:jsonResponse})
            return 
        }else{
            toast.error(jsonResponse.error)
            
            setEmptyFields(jsonResponse.emptyFields)
            return 
        }

    }
    return {login,emptyFields}
}

export default useLogin