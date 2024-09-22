export const fetchAPIKey = async (token: string | null , setApiKey?: (key:string) => void ) => {
    try{
        const serverURL = import.meta.env.VITE_SERVER_URL ;
        const response = await fetch(`${serverURL}/api/keys`,{
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });
        if(response.ok){
            const data =  await response.json();
            setApiKey?.(data.key);
        }else {
            console.log(`Server returned ${response.status} ${response.statusText}`)
        }
    }catch(err){
        console.error('could not get api key, Error: ',err);
    }
} 