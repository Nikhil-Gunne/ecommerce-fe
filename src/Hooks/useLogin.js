import { useState } from "react"
import { useUserContext } from "./useUserContext"
import useCartContext from "./useCartContext"


const useLogin = () =>{
    const [errorMessage,setErrorMessage] = useState("")

    const [emptyFields,setEmptyFields] = useState([])

    const context = useUserContext()

    const {dispatch} = context

    const {dispatch:cartDispatch} = useCartContext()

    const login = async(email,password)=>{
        const user={email,password}
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        }
        const response = await fetch("http://localhost:4000/api/user/login",options)
        const jsonResponse = await response.json()
        // console.log(response,jsonResponse)

        
        
        if(response.ok){
            setErrorMessage("")
            localStorage.setItem("user",JSON.stringify(jsonResponse))
            const fetchCartItems = async () => {
                const response = await fetch(`http://localhost:4000/api/user/get-cart-items/${jsonResponse.user_id}`)
                const jsonResponse1 = await response.json()
                if (response.ok) {
                    cartDispatch({ type: "ADD_ITEMS_TO_CART", payload: [...jsonResponse1.userCart] })
                }
            }
            fetchCartItems()
            dispatch({type:"LOGIN",payload:jsonResponse})
            return jsonResponse
        }else{
            setErrorMessage(jsonResponse.error)
            setEmptyFields(jsonResponse.emptyFields)
            return jsonResponse
        }

    }
    return {login,errorMessage,emptyFields}
}

export default useLogin