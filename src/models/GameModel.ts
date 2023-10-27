
import { Player } from "../models/PlayerModel"


export const Languages: string[] = ["English", "Français", "Nederlands", "Español", "Română"];

class GameModel {

    private rooms: { [roomName: string]: RoomData }; // Object to store room-specific data

    constructor() {
        this.rooms = {};
        for (const language of Languages) { // create rooms
            this.createRoom(language);
        }
    }

    // Create new room
    createRoom(roomName: string) {
        this.rooms[roomName] = new RoomData();
    }

    // Add player to specific room
    addPlayerToRoom(roomName: string, player: Player) {
        if (this.rooms[roomName]) {
            this.rooms[roomName].addPlayer(player);
        }
    }

    // Remove player from specific room
    removePlayerFromRoom(roomName: string, playerId: string) {
        if (this.rooms[roomName]) {
            this.rooms[roomName].removePlayer(playerId);
        }
    }

    getRoomData(roomName: string): RoomData | undefined {
        return this.rooms[roomName];
    }

    // Set the current word for specific room
    setCurrentWordForRoom(roomName: string, word: string) {
        if (this.rooms[roomName]) {
            this.rooms[roomName].setCurrentWord(word);
        }
    }
    
    getAllPlayersInRoom(roomName: string): Player[] {
        return this.getPlayersInRoom(roomName);
    }

    // Getters for game state of a specific room
    getPlayersInRoom(roomName: string): Player[] {
        return this.rooms[roomName] ? this.rooms[roomName].getPlayers() : [];
    }

    getCurrentWordInRoom(roomName: string): string {
        return this.rooms[roomName] ? this.rooms[roomName].getCurrentWord() : "";
    }


}

class RoomData {
    private players: Player[]; // Array to store player data
    private words: string[];
    private currentWord: string; // The word being drawn
    private drawingPlayer: Player | null; // The player who is currently drawing
    private turnPhase: "wordSelection" | "drawing" | "endTurn";
    private currentTurn: number;

    constructor() {
        this.players = [];
        this.currentWord = "";
        this.words = ["word1", "word2", "word3"];
        this.drawingPlayer = null;
        this.turnPhase = "wordSelection";
        this.currentTurn = 0;
    }

    // Add a player to the room
    addPlayer(player: Player) {
        this.players.push(player);
    }

    // Remove a player from the room
    removePlayer(playerId: string) {
        this.players = this.players.filter((player) => player.id !== playerId);
    }

    getTurnPhase(): string {
        return this.turnPhase;
    }

    setTurnPhase(phase: "wordSelection" | "drawing" | "endTurn") {
        this.turnPhase = phase;
    }

    getCurrentTurn(): number {
        return this.currentTurn;
    }

    incrementTurn() {
        this.currentTurn = (this.currentTurn + 1) % this.players.length;
    }

    // Set the current drawing word for the room
    setCurrentWord(word: string) {
        this.currentWord = word;
    }

    // Getters for room state
    getPlayers(): Player[] {
        return this.players;
    }

    getCurrentWord(): string {
        console.log("Word choices: ", this.words)
        return this.currentWord;
    }

    setDrawingPlayer(player: Player) {
        this.drawingPlayer = player;
    }

    getDrawingPlayer(): Player | null {
        return this.drawingPlayer;
    }
}





export default GameModel;
