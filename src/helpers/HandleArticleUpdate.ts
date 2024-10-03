import { Editor as TinyMCEEditor } from 'tinymce';
import axios from "axios"
export const handleArticleUpdate = async (
  event: React.FormEvent<HTMLFormElement>,
  token: string | null,
  id: string | undefined,
  editorRef: React.MutableRefObject<TinyMCEEditor | null>,
  selectedTags: string[] | [],
  comments: string[] | [],
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
      comments: comments,
      isPublished: formData.get('publishArticle')
    };

    const serverURL = import.meta.env.VITE_SERVER_URL;
    const response = await axios.put(`${serverURL}/api/admin/articles/${id}`, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status===200) {
     const data = await response.data;
      successfulSubmit();
    } else {
      console.error(response.statusText);
      failedSubmit(response.statusText);
    }
  }
};
