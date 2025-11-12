export class Game {
    public players: string[] = [];
    public currentPlayerIndex: number = 0;
    public deck: string[] = [];
    public playedCards: string[] = [];

    constructor() {
        const suits = ['spades', 'hearts', 'clubs', 'diamonds'];
        const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
        
        for (const suit of suits) {
            for (const value of values) {
                this.deck.push(`${value}_of_${suit}`);
            }
        }
        
        this.shuffle(this.deck);
    }

    // Shuffle-Funktion von StackOverflow
    private shuffle<T>(array: T[]): T[] {
        let currentIndex = array.length, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ];
        }

        return array;
    }
}