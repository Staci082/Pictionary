import AvatarSlider from "../components/AvatarSlider";

function Homepage() {
    return (
        <form className="flex flex-col items-center gap-8">
            <label htmlFor="username"></label>
            <input
                type="text"
                placeholder="Enter your name.."
                className="bg-transparent p-2 w-[300px] border-solid border-white border-2 rounded-xl outline-none text-white text-center"
            />

            <AvatarSlider/>

            <button className="w-[300px] bg-violet-700 p-2 rounded-lg w-[300] text-white font-bold shadow-xl shadow-indigo-950/50 hover:translate-y-1 hover:bg-indigo-600">
                PLAY!
            </button>
        </form>
    );
}

export default Homepage;
