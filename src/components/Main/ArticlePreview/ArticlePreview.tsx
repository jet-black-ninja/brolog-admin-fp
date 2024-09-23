import { Link } from "react-router-dom";
import { IArticle } from "../../../interfaces/Article";
import { FaRegCommentAlt, FaArrowRight } from "react-icons/fa";
import format from "date-fns/format"
import {stripHtml} from "string-strip-html";
import "./ArticlePreview.scss"
interface Props{
    articleData: IArticle;
}

export default function ArticlePreview({articleData}:Props) {
    const {_id, title, timestamp, comments} = articleData;

    const getTitleExcerpt = (title:string) => {
        const stringWithoutHtml = stripHtml(title).result;
        return stringWithoutHtml.length >= 100
        ? stringWithoutHtml.substring(0,100)+"..."
        : stringWithoutHtml;
    }
    return (
        <Link to={`/article/${_id}`} className="article" aria-label={title}>
            <div className="article-top">
                <div className="article-head">
                    <div className="timestamp">{format(new Date(timestamp),'EEEE,dd. MMMM yyyy')}</div>
                    <h1 className = "article-title">{getTitleExcerpt(title)}</h1>
                </div>
            </div>
            <div className = "article-bottom">
                <span className = "comments">
                    {comments.length}<FaRegCommentAlt />
                </span>
                <div className = "read_more">
                    Details <FaArrowRight />
                </div>
            </div>
        </Link>
    )
}