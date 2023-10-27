import GameModel from "../models/GameModel";
import { Player } from "../models/PlayerModel";
import { Server } from "socket.io";

const phaseDuration = {
    wordSelection: 15 * 1000, // 15 seconds for word selection
    drawing: 3 * 60 * 1000, // 3 minutes for drawing
    wordDisplay: 5 * 1000, // 5 seconds for word display
};

export class TurnManager {
    private gameModel: GameModel;
    private io: Server;

    constructor(gameModel: GameModel, io: Server) {
        this.gameModel = gameModel;
        this.io = io;
    }

    // Add methods for starting and ending turns, handling turn phases, etc.
    startGame(roomName: string) {
        const roomData = this.gameModel.getRoomData(roomName);
        if (roomData) {
            const playersInRoom = roomData.getPlayers();
            const currentTurn = roomData.getCurrentTurn();

            console.log(`It's ${playersInRoom[currentTurn].username}'s turn.`);
        }
    }

    startTurn(nextPlayer: Player) {
        console.log(`It's now ${nextPlayer.username}'s turn.`);
        this.emitTurnMessage(nextPlayer, `It's ${nextPlayer.username}'s turn.`, "text-green-600");
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

    emitTurnMessage(user: Player, text: string, color: string) {
        this.io.emit("messageResponse", {
            text: text,
            color: color,
            id: `${Math.random()}`,
            language: user.language,
            name: "",
        });
    }
}
