import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import FilterContext from '../../../contexts/FilterContext';
import { IArticle } from '../../../interfaces/Article';
import { ViewType } from '../../../interfaces/customTypes';
import { fetchArticleList } from '../../../helpers/FetchArticleList';
import { filterArticle } from '../../../helpers/FilterArticles';
import ArticleFetchAnimation from '../ArticleFetchAnimation/ArticleFetchAnimation';
import ArticleItem from '../ArticlePreview/ArticlePreview';
import NoArticlePage from '../NoArticlePage/NoArticlePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import './SearchResults.css';

interface Props {
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function SearchResults({ setCurrentView }: Props) {
  const { token } = useContext(AuthContext);
  const { filter } = useContext(FilterContext);
  const [activeArticleList, setActiveArticleList] = useState<IArticle[]>([]);
  const [fullArticleList, setFullArticleList] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (token) {
      fetchArticleList('all', token, setFullArticleList, setLoading, setError);
    }
    setCurrentView('Other');
    localStorage.setItem('currentView', 'Other');
  }, []);

  useEffect(() => {
    filterArticle(filter, fullArticleList, setActiveArticleList);
  }, [filter, fullArticleList]);

  if (loading) {
    return <ArticleFetchAnimation />;
  }

  if (error) {
    return <NotFoundPage setCurrentView={setCurrentView} />;
  }

  return (
    <main className="search-results-list">
      {activeArticleList.length === 0 && <NoArticlePage />}
      {activeArticleList?.map((article) => (
        <div key={article._id.toString()} className="article-container">
          <ArticleItem articleData={article} />
        </div>
      ))}
    </main>
  );
}
