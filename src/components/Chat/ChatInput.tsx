// import { useState } from 'react';

const ChatInput = () => {
    return (
        <>
            <div className="w-[90%]h-[80%] bg-white">test</div>

                <input type="text" name="chatInput" placeholder="Type your guess here.." className="w-[90%] absolute bottom-0 rounded-md outline-none p-2 h-8" />
                <button
              
                    style={{
                        backgroundImage: `url("./rocket.avif")`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                    }}
                    className="w-8 absolute right-0 top-0"
                ></button>
           
        </>
    );
};

export default ChatInput;
