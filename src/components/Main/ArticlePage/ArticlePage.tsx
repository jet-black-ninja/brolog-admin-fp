import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ViewType } from "../../../interfaces/customTypes";
import {Link, useParams } from "react-router-dom";
import {IArticle}  from "../../../interfaces/Article";
import { fetchArticleContent } from "../../../helpers/FetchArticleContent";
import ArticleFetchAnimation from "../ArticleFetchAnimation/ArticleFetchAnimation";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import {format} from "date-fns";
import { decode } from "html-entities";
import { stripHtml } from "string-strip-html";
import parse from 'html-react-parser';
import Prims from 'prismjs';
import { ITag } from "../../../interfaces/Tag";
import CommentsSection from "../CommentsSection/CommentsSection";
import BackButton from "../BackButton/BackButton";
import {FaPenAlt, FaTrashAlt, FaGlasses} from 'react-icons/fa';
import "./ArticlePage.scss";
import "../../../libraries/prism-material-dark.scss";

interface Props{
    setCurrentView: Dispatch<SetStateAction<ViewType |  null>>;
}
 
export default function ArticlePage ({setCurrentView}:Props)  {

    const params = useParams();
    const id: string | undefined = params.id;

    const [article , setArticle] = useState<IArticle>();
    const [readingTime, setReadingTime] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    const [refetchTrigger , setRefetchTrigger] = useState<boolean>(false);

    const titleWithoutHTML = article?.title? stripHtml(article.title).result : '';
    const decodedString = decode(article?.content);

    const getReadingTime = () => {
        const wpm = 250;
        const words = decodedString.trim().split(/\s+/).length;
        const time =Math.ceil(words/wpm);
        setReadingTime(time);
    };

    useEffect(() => {
        fetchArticleContent(id, setArticle, setLoading, setError);
    },[id]);

    useEffect(() => {
        if(refetchTrigger){
            fetchArticleContent(id, setArticle, setLoading, setError);
        }
    },[refetchTrigger]);

    useEffect(() =>{
        setRefetchTrigger(false)
    },[refetchTrigger]);
    useEffect(() => {
        Prims.highlightAll();
        getReadingTime();
    },[decodedString]);

    useEffect(() => {
        setCurrentView('Other');
        localStorage.setItem('currentView', 'About');
    },[]);

    if(loading){
        return <ArticleFetchAnimation/>
    }

    if(error) {
        return (<NotFoundPage setCurrentView={setCurrentView}/>);
    }
    return (
        <main className="article_page" aria-label="Main Content for article page" >
            <div className="article_container">
                <header className = "article_header" aria-label ="Article heading">
                    <div className="timestamp">
                        <time>{format(new Date(article?.timestamp || '' ), 'EEEE, dd . MMMM yyyy')}</time>
                    </div>
                    <span className = "author" >by {article?.author?.username}</span>
                </header>
                <h1 id = "article-title" className="article_title">
                    {titleWithoutHTML}
                </h1>
                <ul className="tag-list">
                    {article?.tags?.map((tag:ITag) => (
                        <li key={tag._id.toString()} className="tag-list-item">
                            {tag.name}
                        </li>
                    ))}
                </ul>
                <div className="reading_time">
                    <FaGlasses/> {readingTime} min
                </div>
                <article aria-labelledby="article-content" className="article-content">
                    {parse(decodedString)}
                </article>
                <BackButton/>
                <div className="article_options_container">
                    <Link to={`/edit/article/${id}`} className ="edit_article_button">
                    Edit Article <FaPenAlt/>
                    </Link>
                    <Link to={`/confirm_article_delete/${id}`} className="delete_article-button">
						Delete article <FaTrashAlt />
					</Link>
                </div>
                {article && (
					<CommentsSection commentList={article.comments} setRefetchTrigger={setRefetchTrigger} />
				)}
				{!article && <CommentsSection commentList={[]} setRefetchTrigger={setRefetchTrigger} />}
            </div>
        </main>
    );
}   