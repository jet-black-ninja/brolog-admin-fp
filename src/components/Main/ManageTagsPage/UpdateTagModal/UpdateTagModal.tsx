import { Dispatch, SetStateAction, useContext } from "react";
import { FaTimes } from "react-icons/fa";
import AuthContext from "../../../../contexts/AuthContext";
import "./UpdateTagModal.scss";
import { handleTagUpdateSubmit } from "../../../../helpers/HandleTagUpdateSubmit";

interface Props{
    showUpdateModal:boolean;
    updateTagId:string | null;
    setShowUpdateModal: Dispatch<SetStateAction<boolean>>;
    setUpdateTagId: Dispatch<SetStateAction<string | null>>;
    setUpdateTagName: Dispatch<SetStateAction<string>>;
    setRefetchTrigger: Dispatch<SetStateAction<boolean>>
    successfulSubmit: () => () => void;
    failedSubmit: () => () => void;
    updateTagName: string;    
}

export default function UpdateTagModal({
    showUpdateModal,
    updateTagId,
    setShowUpdateModal,
    setUpdateTagId, 
    setUpdateTagName,
    setRefetchTrigger,
    successfulSubmit,
    failedSubmit,
    updateTagName    
}:Props) {
    const {token} = useContext(AuthContext);
    return(
        <div className={`update_tag_modal-overlay${showUpdateModal ? 'fade-in' : 'fade-out'}`}>
            <div className = "update_tag_modal-content" >
                <button
                className="closeBtn"
                onClick ={ () =>  setShowUpdateModal(false)}
                >
                    <FaTimes/>
                </button>
                <form 
                onSubmit={(event) => {
                    handleTagUpdateSubmit(
                        event,
                        token,
                        updateTagId,
                        setShowUpdateModal,
                        setUpdateTagId,
                        setUpdateTagName,
                        setRefetchTrigger,
                        successfulSubmit,
                        failedSubmit
                    );
                }}>
                    <input type = "text" name="updateTag" defaultValue = {updateTagName} required autoFocus/>
                    <button type = "submit" >Update</button>
                </form>
            </div>
        </div>
    )
}