import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ITag } from "../../../interfaces/Tag";
import { ViewType } from "../../../interfaces/customTypes";
import AuthContext from "../../../contexts/AuthContext";
import { Editor as TinyMCEEditor} from 'tinymce'
import { fetchTagListData } from "../../../helpers/FetchTagListData";
import { handleArticleSubmit } from "../../../helpers/HandleArticleSubmit";
import { Tags } from "./DisplayTagsAdd/DisplayTagsAdd";
import InfoText from "../InfoText/InfoText.tsx"
import ContentEditor from "../ContentEditor/ContentEditor.tsx";
import ArticleFetchAnimation from "../ArticleFetchAnimation/ArticleFetchAnimation.tsx";
import BackButton from "../BackButton/BackButton.tsx";
import "./AddArticlePage.scss";

interface Props{
    setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}
export default function AddArticlePage({setCurrentView}:Props) {
    const {token} = useContext(AuthContext);
    const navigate = useNavigate();
    const [tagList, setTagList] = useState<ITag[]>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [showInfoText, setShowInfoText] = useState<boolean>(false);
    const [infoTextMessage, setInfoTextMessage] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [isPublished, setIsPublished] = useState<boolean>(false);

    const editorRef = useRef<TinyMCEEditor | null >(null);

    const setEditorRef = (editor: TinyMCEEditor) => {
        editorRef.current = editor;
    }
    const handleIsPublishedCheckboxChange = (event:ChangeEvent<HTMLInputElement>) => {
        setIsPublished(event.target.checked);
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleArticleSubmit(event, token, editorRef, selectedTags, isPublished, successfulSubmit, failedSubmit);
    }

    const successfulSubmit = () =>{
        setInfoTextMessage('Article Submitted Successfully');
        setShowInfoText(true);
        const timeoutId = setTimeout(() => {
            navigate('/all');
        },3000);
        return () => clearTimeout(timeoutId);
    }
    const failedSubmit = () => {
        window.alert(`Error:${error}`)
    }

    useEffect (() => {
        fetchTagListData(setTagList, setLoading, setError);
        setCurrentView('Other');
        localStorage.setItem('currentView', 'Other'); 
    },[]);

    if(loading){
        return <ArticleFetchAnimation />
    }
    if(error){
        return <p>An error occurred: {error.message}</p>;
    }

    return (
        <main className = "add-article_page" role='main'>
            <div className="add-article_container">
                {showInfoText? (
                    <InfoText message = {infoTextMessage}/>
                ):(
                    <form onAbort={handleSubmit}>
                    <BackButton />

                    <header className = "add-article_header">
                        <h1 className= "add-article_heading" id = "add-article-heading">
                            Add Article
                        </h1>
                    </header>

                    <div className="tags-container">
                        <label htmlFor="tags">Tags</label>
                        <Tags
                        tagList = {tagList}
                        selectedTags = {selectedTags}
                        setSelectedTags = {setSelectedTags}
                        />
                    </div>

                    <div className = "add-article-title-container">
                        <h2 className = "title-heading">Title: </h2>
                        <input type = "text" name = "title" id = "title" aria-describedby="title-desc" />
                    </div>

                    <div className="editor-container">
                        <h2>Content:</h2>
                        <ContentEditor setEditorRef = {setEditorRef}/>
                    </div>
                    <div className = "create-article-publish-options">
                        <div className="checkbox-container">
                            <input 
                                type="checkbox" 
                                id="publishArticle" 
                                name="publishArticle"  
                                onChange={handleIsPublishedCheckboxChange} 
                                
                            />
                            <label htmlFor="publishArticle">Publish Article Upon Submit</label>
                        </div>
                    </div>
                    <button type = "submit" className="submitArticleBtn">
                        Submit Article
                    </button>
                    </form>
                )}
            </div>
        </main>
    )
}