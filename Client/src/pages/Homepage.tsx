import { GrNext, GrPrevious } from "react-icons/gr";

function Homepage() {
    return (
        <form className="flex flex-col items-center gap-8">
            <label htmlFor="username"></label>
            <input
                type="text"
                placeholder="Enter your name.."
                className="bg-transparent p-2 w-[300px] border-solid border-white border-2 rounded-xl outline-none text-white text-center"
            />

            <div className="w-[300] flex flex-row items-center gap-10">
                <GrPrevious size={28} />

                <div className="border-2 h-[150px] w-[150px]"></div>
                <GrNext size={28}  />
            </div>

            <button className="w-[300px] bg-violet-700 p-2 rounded-lg w-[300] text-white font-bold  shadow-xl shadow-indigo-950/50">
                PLAY!
            </button>
        </form>
    );
}

export default Homepage;
