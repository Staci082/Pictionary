import GameModel from "../models/GameModel";
import { Player } from "../models/PlayerModel";
import { io } from "../index"

const phaseDuration = {
    wordSelection: 15 * 1000, // 15 seconds for word selection
    drawing: 3 * 60 * 1000, // 3 minutes for drawing
    wordDisplay: 5 * 1000, // 5 seconds for word display
};

export class TurnManager {
    private gameModel: GameModel;
    constructor(gameModel: GameModel) {
        this.gameModel = gameModel;
    }

    startGame(roomName: string) {
        const roomData = this.gameModel.getRoomData(roomName);
        if (roomData) {
            const playersInRoom = roomData.getPlayers();
            const currentTurn = roomData.getCurrentTurn();

            console.log(`It's ${playersInRoom[currentTurn].username}'s turn.`);
        }
    }

    // start turn phase
    startTurn(currentPlayer: Player) {
        console.log(`It's now ${currentPlayer.username}'s turn.`);
        this.emitTurnMessage(currentPlayer, `It's ${currentPlayer.username}'s turn.`, "text-green-600");
        io.to(currentPlayer.language).emit("currentPlayer", currentPlayer.id);
    }

    // end turn and make next player
    endTurn(roomName: string) {
        const roomData = this.gameModel.getRoomData(roomName);
        if (roomData) {
            const currentTurn = roomData.getCurrentTurn();

            if (currentTurn < roomData.getPlayers().length) {
                roomData.incrementTurn();

                // Get the next player in turn
                const nextPlayer = roomData.getPlayers()[currentTurn + 1];

                // start next turn
                this.startTurn(nextPlayer);
            }
        }
    }


    // chat messages for turn updates
    emitTurnMessage(user: Player, text: string, color: string) {
        io.to(user.language).emit("messageResponse", {
            text: text,
            color: color,
            id: `${Math.random()}`,
            language: user.language,
            name: "",
        });
    }
}
