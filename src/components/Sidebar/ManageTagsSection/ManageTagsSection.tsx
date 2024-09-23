import {Link} from "react-router-dom";
import { FaShapes } from "react-icons/fa";
import "./ManageTagsSection.scss";

export default function ManageTagsSection() {
    return (
        <div className="manage_tags_side_container">
            <Link to="/manage_tags" className="addTagBtn">
            Manage Tags<FaShapes/>
            </Link>
        </div>
    );
}