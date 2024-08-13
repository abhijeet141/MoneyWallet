export function NavBar({name}){
    return(
        <>
          <div className="shadow h-14 flex justify-between">
                <div className="flex flex-col justify-center h-full ml-4">PayTM App</div>
                <div className="flex">
                    <div className="flex flex-col justify-center h-full mr-4">{name}</div>
                    <div className="rounded-full bg-slate-200 flex justify-center h-12 w-12 pt-3 m-1">{name[0]}</div>
                </div>
            </div>
        </>
    )
}