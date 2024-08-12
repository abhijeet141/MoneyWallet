export function InputBox(props){
    return(
        <div>
            <div className="font-medium text-left px-3">
                {props.label}
            </div>
            <input onChange={props.onChange} type="text" placeholder={props.placeholder} className="text-left w-52 p-1 border rounded m-2 sm:w-72" />
        </div>
    )
}