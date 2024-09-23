import { ChangeEvent} from "react";
import { ITag } from "../../../../interfaces/Tag";

interface ITagsProps{
    tagList: ITag[] | undefined;
    selectedTags: string[];
    setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Tags = ({tagList, selectedTags, setSelectedTags}:ITagsProps) => {
    const handleTagCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        if(event.target.checked){
            setSelectedTags([...selectedTags,value]);
        }else{
            setSelectedTags(selectedTags.filter((tag) => tag!==value));
        }
    };

    if(!tagList){
        return<p>Loading Tags...</p>
    }

    return (
        <div className = "create-article-tag-list" >
            {tagList.map((tag) =>(
                <div key ={tag._id} className="checkbox-container">
                    <input 
                        type="checkbox"
                        id={tag.name}
                        name={tag.name}
                        value={tag._id}
                        onChange={handleTagCheckboxChange}
                        aria-label="tag.name"
                        aria-checked = {selectedTags.includes(tag._id)}
                    />
                    <label htmlFor={tag.name}>{tag.name}</label>
                </div>
            ))}
        </div>
    )
}