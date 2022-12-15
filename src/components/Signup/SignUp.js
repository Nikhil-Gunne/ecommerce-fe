import { useState } from "react"
import useSignUp from "../../Hooks/useSignUp"
import "./SignUp.css"


function SignUp(){
    const [email,setEmail] = useState("")

    const [password,setPassowrd] = useState("")

    const [showPassword,setShowPassword] = useState(false)

    const {signup,emptyFields=[]} =useSignUp()



    const handleEmail = event =>{
        const email = event.target.value.trim()
        setEmail(email)
    }

    const handlePassword = event =>{
        const password = event.target.value.trim()
        setPassowrd(password)
    }

    const handleSubmit = async(event) =>{
        event.preventDefault()
        // console.log(email,password)
        await signup(email,password) 
        setEmail("")
        setPassowrd("")
    }

    const handleShowPassword = () =>{
        setShowPassword(prevState =>(!prevState))
    }

    return <div className="signup-container">
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png" alt="website login" className="website-login-image"/>
        <div className="signup-form-container">
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png" alt="website logo" className="website-logo"/>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="username" className="label">EMAIL</label>
                <input type="text" id="username" placeholder="Enter email" className={emptyFields.includes("email")?"input empty-field":"input"} onChange={handleEmail} value={email}/> 
                <label htmlFor="password" className="label">PASSWORD</label>
                <input type={showPassword?"text":"password"} id="password" placeholder="Enter password"  className={emptyFields.includes("password")?"input empty-field":"input"} onChange={handlePassword} value={password}/> 
                <div className="show-password-container">
                    <input type="checkbox" id="checkbox" onChange={handleShowPassword}/>
                    <label className="show-password-text" htmlFor="checkbox">show password</label>
                </div>
                <button className="signup-button" type="submit">signup</button>
            </form>
        </div>
    </div>

}

export default SignUp