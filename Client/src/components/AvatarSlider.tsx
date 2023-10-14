
import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function AvatarSlider() {
    const avatars: {
        src: string;
        id: number;
    }[] = [
        {
            src: "/face1.avif",
            id: 1,
        },
        {
            src: "/face2.avif",
            id: 2,
        },
        {
            src: "/face3.avif",
            id: 3,
        },
        {
            src: "/face4.avif",
            id: 4,
        },
        {
            src: "/face5.avif",
            id: 5,
        },
        {
            src: "/face6.avif",
            id: 6,
        },
        {
            src: "/face7.avif",
            id: 7,
        },
        {
            src: "/face8.avif",
            id: 8,
        },
        {
            src: "/face9.avif",
            id: 9,
        },
        {
            src: "/face10.avif",
            id: 10,
        },
        {
            src: "/face11.avif",
            id: 11,
        },
        {
            src: "/face12.avif",
            id: 12,
        },
    ];

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const prevAvatar = () => {
        const isFirstAvatar = currentIndex === 0;
        const newIndex = isFirstAvatar ? avatars.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextAvatar = () => {
        const isLastAvatar = currentIndex === avatars.length - 1;
        const newIndex = isLastAvatar ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <>
            <div className="w-[300] flex flex-row items-center gap-10">
                <IoIosArrowBack
                    style={{ cursor: "pointer", color: "white" }}
                    size={32}
                    onClick={prevAvatar}
                />
                <div
                    style={{
                        backgroundImage: `url(${avatars[currentIndex].src})`,
                    }}
                    className="border-2 h-[150px] w-[150px] rounded-2xl"
                ></div>
                <IoIosArrowForward
                    style={{ cursor: "pointer", color: "white" }}
                    size={32}
                    onClick={nextAvatar}
                />
            </div>
        </>
    );
}

export default AvatarSlider;
