import { Link } from "react-router-dom"
export function WarningBottom(props){
    return(
        <div className="flex flex-col justify-center gap-1 sm:flex-row">
            <div>
                {props.label}
            </div>
            <Link className="underline" to={props.to}>
                {props.text}
            </Link>
        </div>
    )
}