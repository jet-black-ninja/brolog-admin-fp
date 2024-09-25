import { Dispatch, SetStateAction, useContext, useRef, useState, useEffect } from "react";
import { ViewType } from "../../../interfaces/customTypes";
import AuthContext from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { ITag } from "../../../interfaces/Tag";
import { IArticle } from "../../../interfaces/Article";
import { fetchArticleContent } from "../../../helpers/FetchArticleContent";
import { handleArticleUpdate } from "../../../helpers/HandleArticleUpdate";
import { fetchTagListData } from "../../../helpers/FetchTagListData";
import InfoText from "../InfoText/InfoText";
import { decode } from "html-entities";
import {Editor as TinyMCEEditor} from "tinymce";
import { Tags } from "./DisplayTagsEdit/DisplayTagsEdit";
import ContentEditor from "../ContentEditor/ContentEditor";
import ArticleFetchAnimation from "../ArticleFetchAnimation/ArticleFetchAnimation";
import BackButton from "../BackButton/BackButton";
import "./EditArticle.scss";

interface Props{
    setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function EditArticle({setCurrentView}:Props) {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();
    const id: string | undefined = params.id;
    const [tagList, setTagList] = useState<ITag[]>();
    const [article, setArticle] = useState<IArticle>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [showInfoText, setShowInfoText] = useState<boolean>(false);
    const [infoTextMessage, setInfoTextMessage] = useState<string | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [articleComments, setArticleComments] = useState<string[]>([]);
    const [initialRender, setInitialRender] = useState<boolean>(true);
    const editorRef = useRef<TinyMCEEditor | null>(null);


    const setEditorRef = (editor: TinyMCEEditor) => {
        editorRef.current = editor;
    }
    const decodedTitle = decode(article?.title);
    const decodedContent = decode(article?.content);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(article){
            handleArticleUpdate(
                event,
                token,
                id,
                editorRef,
                selectedTags,
                articleComments,
                successfulSubmit,
                failedSubmit
            );
        }
    };

    const successfulSubmit = () => {
        setInfoTextMessage('Article Updated Successfully');
        setShowInfoText(true);
        const timeoutId = setTimeout(() => {
            setCurrentView(null);
            navigate(`/all`);
        }, 2000);
        return () => clearInterval(timeoutId);
    }

    const failedSubmit = (error: Error) => {
        window.alert(`Error:${error}`);
    }

    useEffect(() => {
        fetchTagListData(setTagList, setLoading, setError);
        fetchArticleContent(id, setArticle, setLoading, setError);
    },[id])

    useEffect(() => {
        if(initialRender && article){
            setSelectedTags(article.tags.map((tag) => tag._id));
            setInitialRender(false);
        }
    },[article, initialRender]);

    useEffect(() =>  {
        if(article) {
            setArticleComments(article.comments.map((comment) => comment._id));
        }
    },[article]);

    useEffect(() => {
        const timeoutId = setTimeout(navigate , 3000);
        return () => clearTimeout(timeoutId);
    },[navigate]);

    useEffect(() => {
        setCurrentView('Other');
        localStorage.setItem('currentView', 'Other');
    },[]);
    
    if(loading){
        return <ArticleFetchAnimation/>
    }
    if(error) {
        return <p>An Error occurred...{error.message}</p>;
    }
    return (
        <main className="edit-article_page">
          <div className="edit-article_container">
            {showInfoText ? (
              <InfoText message={infoTextMessage} />
            ) : (
              article && (
                <form onSubmit={handleSubmit}>
                  <BackButton />
                  <h1 className="edit-article_heading">Edit article</h1>
                  <div className="tags-container">
                    <label htmlFor="tags">Tags</label>
                    {tagList && (
                      <Tags
                        tagList={tagList}
                        articleTags={article.tags}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                      />
                    )}
                  </div>
                  <div className="edit-article-title-container">
                    <h2>title:</h2>
                    <input
                      type="text"
                      name="title"
                      defaultValue={decodedTitle}
                      onChange={ (e) => setArticle({ ...article, title: e.target.value })}
                      aria-label="Article title"
                    />
                  </div>
                  <div className="editor-container">
                    <h2>content:</h2>
                    <ContentEditor setEditorRef={setEditorRef} decodedContent={decodedContent} />
                  </div>
                  <div className="create-article-publish-options">
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        id="publishArticle"
                        name="publishArticle"
                        defaultChecked={article?.isPublished}
                        aria-label="Publish article when submitting"
                      />
                      <label htmlFor="publishArticle">publish article when submitting</label>
                    </div>
                  </div>
                  <button type="submit">Submit article</button>
                </form>
              )
            )}
          </div>{' '}
        </main>
      );
}