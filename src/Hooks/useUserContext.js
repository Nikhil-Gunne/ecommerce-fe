import { useContext } from "react"
import {userContext} from "../context/userContextProvider"


export const useUserContext = () =>{
    const context = useContext(userContext)
    // console.log(context)
    if(!context){
        throw Error("cannot use outside the wrapped component")
    }
    return context

}