

export class Player {
    constructor(
        public id: string, 
        public username: string,
        public avatar: string,
        public points: number,
        public language: string
        ) {
        this.id = id
        this.username = username
        this.avatar = avatar
        this.points = points
        this.language = language
    }
}