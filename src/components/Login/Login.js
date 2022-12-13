import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../Hooks/useLogin"
import "./Login.css"

function Login(){
    const [email,setEmail] = useState("")

    const [password,setPassowrd] = useState("")

    const [showPassword,setShowPassword] = useState(false)

    const {login,errorMessage="",emptyFields=[]} =useLogin()


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
        await login(email,password) 
    }

    const handleShowPassword = () =>{
        setShowPassword(prevState =>(!prevState))
    }
    
    return <div className="login-container">
        <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png" alt="website login" className="website-login-image"/>
        <div className="login-form-container">
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
                <button className="login-button" type="submit">Login</button>
                <Link to="/signup" className="sign-up-link"><button className="sign-up-button">sign up</button></Link>
                {errorMessage.length>0&&<p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    </div>

}

export default Login