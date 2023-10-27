import GameModel from "../models/GameModel";

export class TurnManager {
    private gameModel: GameModel;

    constructor(gameModel: GameModel) {
        this.gameModel = gameModel;
    }
    
    // Add methods for starting and ending turns, handling turn phases, etc.
    startTurn(roomName: string) {
        const roomData = this.gameModel.getRoomData(roomName);
        if (roomData) {
            const playersInRoom = roomData.getPlayers();
            const currentTurn = roomData.getCurrentTurn();

            console.log(`It's ${playersInRoom[currentTurn].username}'s turn.`);

            // Implement your turn logic here
            // Set the turnPhase to "wordSelection", "drawing", etc.
            // Implement timers for each phase
            // Notify players about their turn, and when the turn ends, increment the turn
        }
    }

    endTurn(roomName: string) {
        const roomData = this.gameModel.getRoomData(roomName);
    
        if (roomData) {
            // Remove the player from the room
            const currentTurn = roomData.getCurrentTurn();

            if (currentTurn < roomData.getPlayers().length) {
                // Increment the turn
                roomData.incrementTurn();

                // Get the next player in turn
                const nextPlayer = roomData.getPlayers()[currentTurn + 1];

                // Implement your logic to notify the next player that it's their turn
                console.log(`It's now ${nextPlayer.username}'s turn.`);
            }
    }
        // Your turn-based game logic to end a turn here
    }
}
