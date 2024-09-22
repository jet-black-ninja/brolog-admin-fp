import { Link } from "react-router-dom";
import {FaPen} from "react-icons/fa";
import "./AddArticleSection.scss"

export default function AddArticleSection(){
    return (
        <div className = "add_article-containeer">
            <Link to ="/add_article" className="addArticleBtn" aria-label='Add article'>
            Add Article<FaPen/>
            </Link>
        </div>
    )
}