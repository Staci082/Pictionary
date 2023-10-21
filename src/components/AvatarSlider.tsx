import { useState } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function AvatarSlider({ onAvatarSelect }: { onAvatarSelect: (selected: string) => void; }) {
    const avatars: string[] = []
        const numAvatars = 16;

        for (let i = 1; i <= numAvatars; i++) {
        avatars.push(`avatars/face${i}.avif`);
        }

    const [currentIndex, setCurrentIndex] = useState<number>(0);

    const prevAvatar = () => {
        const isFirstAvatar = currentIndex === 0;
        const newIndex = isFirstAvatar ? avatars.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        onAvatarSelect(avatars[newIndex]);

    };

    const nextAvatar = () => {
        const isLastAvatar = currentIndex === avatars.length - 1;
        const newIndex = isLastAvatar ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        onAvatarSelect(avatars[newIndex]);
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
                        backgroundImage: `url("/${avatars[currentIndex]}")`,
                        backgroundSize: "contain",
                        cursor: "pointer", 
                    }}
                    className="border-2 z-10 h-[150px] w-[150px] rounded-2xl"
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
