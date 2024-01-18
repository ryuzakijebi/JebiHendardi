const NavigationBar = () => {
    return(
        <>
        <div className="w-full h-28 shadow-md">
            <div>
                <div className="flex justify-start items-start">
                    <h4 className="text-gray-500">Management Story</h4>
                </div>
                <div className="flex justify-start items-start bg-slate-300">
                    <h5 className="text-[1.5rem]">...</h5>
                </div>
                <div className="flex justify-start items-start ">
                    <h1 className="font-bold text-gray-500 text-[1.5rem] ml-4 2xl:p-2">Storyku</h1>
                </div>
            </div>
        </div>
        </>
    )
}
export default NavigationBar;