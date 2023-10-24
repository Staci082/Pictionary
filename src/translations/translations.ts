export type Translations = Record<string, string>;

const Translations: Record<string, Translations> = {
    English: {
        // homepage
        play: "Play",
        enterName: "Enter your name..",
        // players
        points: "points",
        // chat
        enterGuess: "Type your guess here..",
        playerJoined: "has joined the game",
        playerLeft: "has left the game",
        you: "you",
        // inbetween turns
        chooseWord: "Choose your word..",
        onWait: "is choosing the word..",
        wordWas: "the word was: ",
    },
    Français: {
        // homepage
        play: "Jouer",
        enterName: "Entrez votre nom..",
        // players
        points: "points",
        // chat
        enterGuess: "Tapez votre supposition ici..",
        playerJoined: "a rejoint le jeu",
        playerLeft: "a quitté le jeu",
        you: "vous",
        // inbetween turns
        chooseWord: "Choisissez votre mot..",
        onWait: "choisit le mot..",
        wordWas: "le mot était : "
    },
    Nederlands: {
        // homepage
        play: "Spelen",
        enterName: "Voer je naam in..",
        // players
        points: "punten",
        // chat
        enterGuess: "Type je gok hier..",
        playerJoined: "is bij het spel gevoegd",
        playerLeft: "heeft het spel verlaten",
        you: "jij",
        // inbetween turns
        chooseWord: "Kies je woord..",
        onWait: "kiest het woord..",
        wordWas: "het woord was: "
    },
    Español: {
        // homepage
        play: "Jugar",
        enterName: "Ingresa tu nombre..",
        // players
        points: "puntos",
        // chat
        enterGuess: "Escribe tu suposición aquí..",
        playerJoined: "se ha unido al juego",
        playerLeft: "ha dejado el juego",
        you: "tú",
        // inbetween turns
        chooseWord: "Elige tu palabra..",
        onWait: "está eligiendo la palabra..",
        wordWas: "la palabra era: "
    },
    Românesc: {
        // homepage
        play: "Joacă",
        enterName: "Introduceți numele dvs..",
        // players
        points: "puncte",
        // chat
        enterGuess: "Tastați ghicirea dvs. aici..",
        playerJoined: "s-a alăturat jocului",
        playerLeft: "a părăsit jocul",
        you: "tu",
        // inbetween turns
        chooseWord: "Alege-ți cuvântul..",
        onWait: "alege cuvântul..",
        wordWas: "cuvântul a fost: "
    },
};

export default Translations;
