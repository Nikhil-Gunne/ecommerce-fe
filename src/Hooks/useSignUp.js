import { useState } from "react"
import { useUserContext } from "./useUserContext"
import { toast } from 'react-toastify';

const useSignUp = () =>{

    const [emptyFields,setEmptyFields] = useState([])

    const context = useUserContext()

    const URL ="https://ecommerce-api-ws77.onrender.com"

    //"http://localhost:4000"

    const {dispatch} = context
    const signup = async(email,password)=>{
        const user={email,password}
        const options = {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        }
        const response = await fetch(`${URL}/api/user/signup`,options)
        const jsonResponse = await response.json()
        //console.log(response,jsonResponse)
        if(response.ok){
            toast.success("login successful")
            localStorage.setItem("user",JSON.stringify(jsonResponse))
            dispatch({type:"LOGIN",payload:jsonResponse})
            return jsonResponse
        }else{
            toast.error(jsonResponse.error)
            setEmptyFields(jsonResponse.emptyFields)
            return jsonResponse
        }

    }
    return {signup,emptyFields}
}

export default useSignUp