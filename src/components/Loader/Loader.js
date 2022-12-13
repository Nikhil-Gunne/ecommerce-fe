import Loader from "react-loader-spinner"
import "./Loader.css"

const LoaderComponent = () =><div className="loader-container">
    <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
</div>


export default LoaderComponent