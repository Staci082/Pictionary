
import { Player } from "../models/PlayerModel"
import wordsData from "../utils/words/words.json";

export const Languages: string[] = ["English", "Français", "Nederlands", "Español", "Română"];

class GameModel {

    private rooms: { [roomName: string]: RoomData }; // Object to store room-specific data

    constructor() {
        this.rooms = {};
        // create rooms
        for (const language of Languages) {
            this.createRoom(language);
        }
    }

    // Create a new room
    createRoom(roomName: string) {
        this.rooms[roomName] = new RoomData();
    }

    // Add a player to a specific room
    addPlayerToRoom(roomName: string, player: Player) {
        if (this.rooms[roomName]) {
            this.rooms[roomName].addPlayer(player);
            console.log('Player added to room: ', roomName)
        }
    }

    // Remove a player from a specific room
    removePlayerFromRoom(roomName: string, playerId: string) {
        if (this.rooms[roomName]) {
            this.rooms[roomName].removePlayer(playerId);
        }
    }

    // Set the current drawing word for a specific room
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

    // ... other methods for room-specific data

}

class RoomData {
    private players: Player[]; // Array to store player data
    private words: string[];
    private currentWord: string; // The word being drawn
    private drawingPlayer: Player | null; // The player who is currently drawing

    constructor() {
        this.players = [];
        this.currentWord = "";
        this.words = ["word1", "word2", "word3"];
        this.drawingPlayer = null;
    }

    // Add a player to the room
    addPlayer(player: Player) {
        this.players.push(player);
    }

    // Remove a player from the room
    removePlayer(playerId: string) {
        this.players = this.players.filter((player) => player.id !== playerId);
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
