import { Editor as TinyMCEEditor } from 'tinymce';
import axios from "axios";
export const handleArticleSubmit = async (
  event: React.FormEvent<HTMLFormElement>,
  token: string | null,
  editorRef: React.MutableRefObject<TinyMCEEditor | null>,
  selectedTags: string[],
  isPublished: boolean,
  successfulSubmit: () => () => void,
  failedSubmit: (error: any) => void
) => {
  if (token) {
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const body = {
      title: formData.get('title'),
      content: editorRef.current ? editorRef.current.getContent() : '',
      tags: selectedTags,
      isPublished: isPublished
    };
    console.log(body, " body");
    const serverURL = import.meta.env.VITE_SERVER_URL;
    const response = await fetch(`${serverURL}/api/admin/articles/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (response.status===200) {
    const data = await response.json();
    // console.log(data);
      successfulSubmit();
    } else {
      console.error(response.statusText);
      failedSubmit(response.statusText);
    }
  }
};
