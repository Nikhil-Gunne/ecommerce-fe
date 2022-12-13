import { useState } from "react"
import { useUserContext } from "./useUserContext"


const useSignUp = () =>{
    const [errorMessage,setErrorMessage] = useState("")

    const [emptyFields,setEmptyFields] = useState([])

    const context = useUserContext()

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
        const response = await fetch("http://localhost:4000/api/user/signup",options)
        const jsonResponse = await response.json()
        //console.log(response,jsonResponse)
        if(response.ok){
            setErrorMessage("")
            localStorage.setItem("user",JSON.stringify(jsonResponse))
            dispatch({type:"LOGIN",payload:jsonResponse})
            return jsonResponse
        }else{
            setErrorMessage(jsonResponse.error)
            setEmptyFields(jsonResponse.emptyFields)
            return jsonResponse
        }

    }
    return {signup,errorMessage,emptyFields}
}

export default useSignUp