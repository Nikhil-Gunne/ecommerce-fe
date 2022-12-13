import { Link } from "react-router-dom"
import Navbar from "../Navbar/Navbar"
import "./Home.css"
const Home = () => {
    return <div className="home-container">
        <Navbar />
        <hr />
        <div className="home-content-container">
            <div className="home-description-container">
                <h1 className="home-heading">Clothes that get you <br />noticed</h1>
                <p className="home-description">Fashion is part of the daily air and it does not quite help that it changes all the time. Clothes have always been a marker of the era and we are in a revolution. Your fashion makes you been seen and heard that way you are. So, celebrate the seasons new and exciting fashion in your own way.</p>
                <Link to="/products">
                    <button className="shop-now-button">Shop now</button>
                </Link>
            </div>
            <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png" alt="home" className="clothes-image" />
        </div>
        <div className="home-mobile-content-container">
            <div className="home-description-container">
                <h1 className="home-heading">Clothes that get you <br />noticed</h1>
                <img src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png" alt="home" className="clothes-image" />
                <p className="home-description">Fashion is part of the daily air and it does not quite help that it changes all the time. Clothes have always been a marker of the era and we are in a revolution. Your fashion makes you been seen and heard that way you are. So, celebrate the seasons new and exciting fashion in your own way.</p>
                <Link to="/products">
                    <button className="shop-now-button">Shop now</button>
                </Link>
            </div>
            
        </div>
        
    </div>
}

export default Home