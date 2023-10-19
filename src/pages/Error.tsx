import "../assets/starsAnimation.css";

function Error() {
    return (
        <>
        <div className="overflow-hidden h-screen w-screen relative flex justify-center items-center">
            <h1 className=" h-screen text-white text-4xl absolute top-4 left-4 overflow-hidden">
                404 <br /> Page Not Found
            </h1>
            <img src="/404.gif" alt="alien" />
            <div className="w-full absolute ">
                <div id="stars"></div>
                <div id="stars2"></div>
                <div id="stars"></div>
            </div>
            </div>
        </>
    );
}

export default Error;
