export const handleArticleDelete = async(
    token: string | null,
    id: string | undefined,
    successfulSubmit: () => () => void ,
    failedSubmit: (error: any) => void 
) => {
    const serverURL = import.meta.env.VITE_SERVER_URL;
    const response = await fetch(`${serverURL}/api/admin/articles/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    if(response.ok){
        // const data = await response.json();
        successfulSubmit();
    }else {
        console.error(response.statusText);
        failedSubmit(response.statusText);
    }
}