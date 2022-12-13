import { createContext, useReducer,useEffect } from "react"

export const userContext = createContext()

const userReducer=(state,action) =>{
    switch(action.type){
        case "LOGIN":
            return {user:action.payload}
        case "LOG_OUT":
            return {user:null}
        default:
            return state 
    }
}



const UserContextProvider = ({children}) =>{
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        // console.log(user)
        if(user){
            dispatch({type:"LOGIN",payload:user})
        }
    },[])
    
    const [user,dispatch] = useReducer(userReducer,null)
    return <userContext.Provider value={{...user,dispatch}}>
        {children}
    </userContext.Provider>
}

export default UserContextProvider