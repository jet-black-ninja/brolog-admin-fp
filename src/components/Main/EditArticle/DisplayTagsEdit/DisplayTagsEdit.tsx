import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ITag } from "../../../../interfaces/Tag";

interface ITagprops{
    tagList: ITag[] | undefined;
    articleTags: ITag[];
    selectedTags: string[];
    setSelectedTags: Dispatch<SetStateAction<string[]>>;
}

export const Tags = ({tagList,articleTags, selectedTags, setSelectedTags}: ITagprops) => {
    const handleTagCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value}  = event.target;
        if(event.target.checked){
            setSelectedTags([...selectedTags,value]);
        }else {
            setSelectedTags(selectedTags.filter((tag) => tag!==value));
        }
    };

    if(!tagList) {
        return <p>Loading Tags...</p>;
    }

    return(
        <div className="create-article-tag-list">
      {tagList.map((tag) => (
        <div key={tag._id} className="checkbox-container">
          <input
            type="checkbox"
            id={tag.name}
            name={tag.name}
            value={tag._id}
            defaultChecked={articleTags?.some((t) => t._id === tag._id)}
            onChange={(e) => handleTagCheckboxChange(e)}
          />
          <label htmlFor={tag.name}>{tag.name}</label>
        </div>
      ))}
    </div>
    );
}