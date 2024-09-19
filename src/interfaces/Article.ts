import {IComment } from "./Comment"
import {ITag} from "./Tag"

export interface IArticle{
    _id:string;
    author:{
        username:string;
        _id:string;
    };
    title:string;
    content:string;
    timestamp: Date;
    tags:ITag[];
    comments : IComment[];
    isPublished: boolean;
}