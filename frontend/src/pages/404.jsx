import '@fortawesome/fontawesome-free/css/all.min.css';

export function Err() {
    return (
        <>
            <div className="flex flex-col justify-center items-center h-dvh text-2xl">
                <h1 className='text-6xl'>4<span><i class="fas fa-ghost text-purple-500 text-6xl pl-2 pr-2"></i>
                </span>4</h1>
                <h2>Error: 404 page not found</h2>
                <p>Sorry, the page you're looking for cannot be accessed</p>
            </div>
        </>
    )
}

