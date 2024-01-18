import { Link } from "react-router-dom"
const SidebarMenu  = () => {
    return(
        <>
        <div className=" h-screen bg-slate-200 border-r-2 p-2 border-[#CBD5E1]">
            <div className="container mx-auto">
                <div className="grid grid-rows-2">
                    <div className="flex transition-transform hover:scale-110 duration-300 text-purple-700 underline justify-start items-start ml-4 p-2">
                        <Link to="/">
                            <button className='hover:text-black underline'><span><img src="" alt="" /></span>Home</button>
                        </Link>  
                    </div>
                    <div className="flex transition-transform hover:scale-110 duration-300 text-purple-700 underline justify-start items-start ml-4 p-2">
                        <button className='hover:text-black'><span><img src="" alt="" /></span>Management Story</button>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default SidebarMenu