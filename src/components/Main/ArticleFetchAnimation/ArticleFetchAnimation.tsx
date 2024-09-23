import { MagnifyingGlass } from "react-loader-spinner";
import "./ArticleFetchAnimation.scss";

export default function ArticleFetchAnimation() {
    return (
        <div className = "fetching">
            <MagnifyingGlass 
            visible={true}
            height="80"
            width="80"
            ariaLabel="Loading data"
            wrapperStyle={{}}
            wrapperClass="loading-spinner"
            glassColor="#c0efff"
            color="#e15b64"
            />
            <p>Loading...</p>
        </div>
    )
}