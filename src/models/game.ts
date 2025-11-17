export interface PlayerData {
    name: string;
    gender: 'male' | 'female';
    avatar: string;
}

export class Game {
    public players: PlayerData[] = [];
    public currentPlayerIndex: number = 0;
    public deck: string[] = [];
    public playedCards: string[] = [];
    
    // Verfügbare Avatar-Positionen
    private availableMaleAvatars: string[] = [
        '5% 5%',    // Position 0 (oben links)
        '95% 5%',   // Position 2 (oben rechts)
        '5% 50%',   // Position 3 (mitte links)
        '5% 95%',   // Position 6 (unten links)
        '95% 95%',  // Position 8 (unten rechts)
    ];
    
    private availableFemaleAvatars: string[] = [
        '50% 5%',   // Position 1 (oben mitte)
        '50% 50%',  // Position 4 (mitte mitte)
        '95% 50%',  // Position 5 (mitte rechts)
        '50% 95%',  // Position 7 (unten mitte)
    ];

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

    addPlayer(name: string, gender: 'male' | 'female'): boolean {
        const avatarPool = gender === 'male' ? this.availableMaleAvatars : this.availableFemaleAvatars;
        
        if (avatarPool.length === 0) {
            console.warn(`Keine weiteren ${gender === 'male' ? 'männlichen' : 'weiblichen'} Avatare verfügbar!`);
            return false;
        }
        
        const randomIndex = Math.floor(Math.random() * avatarPool.length);
        const avatar = avatarPool[randomIndex];
        
        avatarPool.splice(randomIndex, 1);
        
        this.players.push({ name, gender, avatar });
        return true;
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