export type Translations = Record<string, string>;

const Translations: Record<string, Translations> = {
    English: {
        play: "Play",
        enterName: "Enter your name..",
        points: "points",
        enterGuess: "Type your guess here..",
        playerJoined: "has joined the game",
        playerLeft: "has left the game",
        you: "you"
    },
    Français: {
        play: "Jouer",
        enterName: "Entrez votre nom..",
        points: "points",
        enterGuess: "Tapez votre supposition ici..",
        playerJoined: "a rejoint le jeu",
        playerLeft: "a quitté le jeu",
        you: "vous"
    },
    Nederlands: {
        play: "Spelen",
        enterName: "Voer je naam in..",
        points: "punten",
        enterGuess: "Type je gok hier..",
        playerJoined: "is bij het spel gevoegd",
        playerLeft: "heeft het spel verlaten",
        you: "jij"
    },
    Español: {
        play: "Jugar",
        enterName: "Ingresa tu nombre..",
        points: "puntos",
        enterGuess: "Escribe tu suposición aquí..",
        playerJoined: "se ha unido al juego",
        playerLeft: "ha dejado el juego",
        you: "tú"
    },
    Românesc: {
        play: "Joacă",
        enterName: "Introduceți numele dvs..",
        points: "puncte",
        enterGuess: "Tastați ghicirea dvs. aici..",
        playerJoined: "s-a alăturat jocului",
        playerLeft: "a părăsit jocul",
        you: "tu"
    }
};

export default Translations;
