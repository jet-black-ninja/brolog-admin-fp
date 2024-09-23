import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "./BackButton.scss";
export default function BackButton(){
    const navigate = useNavigate();
    const goToPrevPage = () => {
        navigate(-1);
    }
    return (
        <button className = "backBtn" onClick = {goToPrevPage}>
            <FaArrowLeft />Go Back
        </button>
    )
}