import { Link } from "react-router-dom"
export function Navigation({logo,signup,signin}){
    return(
        <div className="shadow w-full fixed">
            <div className="h-14 flex justify-between items-center text-xl mx-8 sm:mx-20 py-4">
                <Link to={'/'}>{logo}</Link>
                <div className="flex gap-6">
                    <Link to={'/signup'}>{signup}</Link>
                    <Link to={'/signin'}>{signin}</Link>
                </div>
            </div>
        </div>
    )
}