import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../contexts/AuthContext";
import { handleArticleDelete } from "../../../helpers/HandleArticleDelete";
import InfoText from "../InfoText/InfoText";
import "./ConfirmArticleDelete.scss";

export default function ConfirmArticleDelete() {
    const {token} = useContext(AuthContext);
    const [showInfoText, setShowInfoText] = useState<boolean>(false);
    const [infoTextMessage, setInfoTextMessage] = useState<string| "">("");

    const params = useParams();
    const id: string | undefined = params.id;
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    }
    const handleDelete = () =>{
        handleArticleDelete(token, id, successfulSubmit, failedSubmit);
    }
    const successfulSubmit = () => {
        setInfoTextMessage("Article deleted successfully.");
        setShowInfoText(true);
        const timeoutId = setTimeout(() => {
            navigate('/all');
        }, 3000);
        return () => clearTimeout(timeoutId);
    };

    const failedSubmit = (error: Error) => {
        window.alert(`Error:${error}`);
    }

    return (
        <div className= "confirm_article_delete">
            {showInfoText ?(
                <InfoText message ={infoTextMessage} />
            ):(
                <>
                <h1> Are You Sure ?</h1>
                <p>This cannot Be Undone!</p>
                <div className= "confirm_delete_button_container">
                    <button className ="go_back" onClick={handleBack}>
                        Go Back
                    </button>
                    <button className ="delete_article" onClick={handleDelete}>
                        Delete
                    </button>
                </div> 
                </>
            )}
        </div>
    );
}