export default function Players() {
    return (
        <>
            <div className="my-1 flex items-center justify-center relative rounded-sm h-12 bg-blue-200">
                <div className="flex flex-col">
                    <b className="text-sm">Username</b>
                    <p className="text-sm">Points: 100</p>
                </div>
                <img
                    src="/face4.avif"
                    alt="player avatar"
                    className="w-10 hover:scale-150 absolute right-1 top-1 rounded-lg"
                />
                
                </div>
        </>
    );
}
