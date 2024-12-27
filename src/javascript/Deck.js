import {Card} from "./Card.js";

export class Deck {
    constructor() {
        this.cards = [];
        this.buildDeck();
        this.shuffle();
    }

    // Create the deck of cards
    buildDeck() {
        const colors = ['yellow', 'green', 'blue', 'orange', 'red', 'purple'];
        const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
        // 2 Wild Rage, 4 Change Rage, 4 Out Rage, 2 Bonus Rage and 2 Mad Rage
        this.cards = [];

        // Create the deck of cards
        colors.forEach(color => {
            numbers.forEach(number => {
                this.cards.push(new Card(color, number));
            });
        });
        for (let i = 0; i < 2; i++) {
            this.cards.push(new Card('black', 'Wild Rage'));
            this.cards.push(new Card('black', 'Bonus Rage'));
            this.cards.push(new Card('black', 'Mad Rage'));
        }
        for (let i = 0; i < 4; i++) {
            this.cards.push(new Card('black', 'Change Rage'));
            this.cards.push(new Card('black', 'Out Rage'));
        }
    }

    // Shuffle the deck
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    // Deal a card
    dealCard() {
        return this.cards.pop();
    }

    // Get the remaining cards in the deck
    getRemainingCards() {
        return this.cards;
    }
}
