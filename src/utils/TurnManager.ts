import GameModel from "../models/GameModel";
import { Player } from "../models/PlayerModel"

export class TurnManager {
    private gameModel: GameModel;

    constructor(gameModel: GameModel) {
        this.gameModel = gameModel;
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
}
