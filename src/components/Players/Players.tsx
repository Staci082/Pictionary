
import { useLanguage } from "../../context/LanguageContext";
import Translations from "../../translations/translations";
 import { useGame } from '../../context/GameContext';



export default function Players() {
    const {  players, currentTurn } = useGame();

    const { selectedLanguage } = useLanguage();
    const translations = Translations;

    return (
        <>
        <button onClick={() => console.log(currentTurn)} className="h-8 w-8 bg-red-300"></button>

            {players
                .filter((user) => user.language === selectedLanguage)
                .map((user) => (
                    <div key={user.id} className="my-1 flex items-center justify-center rounded-sm h-12 bg-blue-200">
                        <div className="flex items-center justify-between w-full mx-2">

                                <div
                                    style={{
                                        backgroundImage: `url("./pencil.avif")`,
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat",
                                        // add pencil indicater to show who is currently on turn
                                        visibility: currentTurn === user.id ? "visible" : "hidden",
                                    }}
                                    className="sm:w-10 sm:h-10 w-7 h-7"
                                ></div>


                            <div className="flex flex-col text-center">
                                <b className="sm:text-sm text-xs">{user.username}</b>
                                <p className="sm:text-sm text-xs">
                                    {translations[selectedLanguage].points}: {user.points}
                                </p>
                            </div>
                            <img src={user.avatar} alt="player avatar" className="sm:w-10 w-7 hover:scale-150 sm:rounded-xl rounded-lg" />
                        </div>
                    </div>
                ))}
        </>
    );
}
