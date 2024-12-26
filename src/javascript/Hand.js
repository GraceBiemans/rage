class Hand {
    constructor() {
        this.cards = [];
    }

    // Draw a card and add it to the hand
    drawCard(deck) {
        const card = deck.dealCard();
        this.cards.push(card);
    }

    // Discard a card (remove it from the hand)
    discardCard(card) {
        const index = this.cards.indexOf(card);
        if (index > -1) {
            this.cards.splice(index, 1);
        }
    }

    // Display the cards in the hand
    showHand() {
        return this.cards;
    }
}
