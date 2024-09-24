import "./InfoText.scss"

interface Props{
    message:string;
}

export default function InfoText({message}:Props){
    return(
        <h1 className="infoText" aria-live="polite" aria-atomic="true">
            {message || ""}
        </h1>
    )
}