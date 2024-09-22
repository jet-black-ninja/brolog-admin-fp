export const fetchArticleContent = async (
    id:string | undefined,
    setArticle ?: Function,
    setLoading ?: Function, 
    setError ?: Function
) => {
    try{
        const serveURL = import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${serveURL}/api/articles/${id}`);
        if(res.ok){
            const data = await res.json();
            if(setArticle){
                setArticle(data.article);
            }
        }else {
            throw new Error (`Server returned ${res.status} ${res.statusText}`)
        }
    }catch(err){
        if(setError){
            setError(err);
        }
    }
    if(setLoading){
        setLoading(false);
    }
}