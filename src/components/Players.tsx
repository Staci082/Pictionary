

export default function Players() {

    const username = localStorage.getItem("username");
    const avatar = localStorage.getItem("avatar") ?? "/face9.avif";

    return (
        <>
            <div className="my-1 flex items-center justify-center relative rounded-sm h-12 bg-blue-200">
                <div className="flex flex-col text-center">
                    <b className="text-sm">{username}</b>
                    <p className="text-sm">Points: 100</p>
                </div>
                <img
                    src={avatar}
                    alt="player avatar"
                    className="w-10 hover:scale-150 absolute right-1 top-1 rounded-xl"
                />
            </div>
        </>
    );
}
