import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { ViewType } from "../../../interfaces/customTypes";
import AuthContext from "../../../contexts/AuthContext";
import FilterContext from "../../../contexts/FilterContext";
import { IArticle } from "../../../interfaces/Article";
import { fetchArticleList } from "../../../helpers/FetchArticleList";
import ArticleFetchAnimation from "../ArticleFetchAnimation/ArticleFetchAnimation";
import ArticleItem from "../ArticlePreview/ArticlePreview.tsx";
import NotFoundPage from "../NotFoundPage/NotFoundPage.tsx"
import NoArticlePage from "../NoArticlePage/NoArticlePage.tsx"
interface Props{
    setCurrentView: Dispatch<SetStateAction<ViewType|null>>;
}

export default function AllArticles({setCurrentView}:Props) {
    const {token} = useContext(AuthContext);
    const {setFilter} = useContext(FilterContext);
    const [fullArticleList, setFullArticleList] = useState<IArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        if(token){
            fetchArticleList('all', token, setFullArticleList, setLoading, setError);
        }
        setFilter(null);
        setCurrentView('All');
        localStorage.setItem('currentView','All');
        },[])
        if(loading){
            return <ArticleFetchAnimation/>
        }
        if(error){
            return <NotFoundPage setCurrentView={setCurrentView} />
        }
        return (
        <main className = "all-articles-list">
            {fullArticleList.length===0 && <NoArticlePage />}
            {fullArticleList?.map((article) => (
                <div key = {article._id.toString()} className ="article-container" >
                    <ArticleItem articleData={article} />
                </div>
            ))}
        </main>
    )
}