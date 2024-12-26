<template>
  <div class="deck">
<!--    <button @click="shuffleDeck">Shuffle</button>-->
    <button @click="dealHands">Deal Hands</button>
  </div>
</template>

<script>
import {Deck} from '../javascript/Deck.js'; // Import the Deck class

export default {
  data() {
    return {
      deck: new Deck(),
    };
  },
  methods: {
    shuffleDeck() {
      this.deck.shuffle();
    },
    dealHands() {
      // Deal hand to player
      for (let i = 0; i < 10; i++) {
        this.$emit('deal-card', this.deck.dealCard(), 'player');
      }

      // Deal hand to opponent
      for (let i = 0; i < 10; i++) {
        this.$emit('deal-card', this.deck.dealCard(), 'opponent');
      }

      this.$emit('create-trump-pile', this.deck.getRemainingCards());
    },
  },
};
</script>

<style scoped>
.deck {
  text-align: center;
  margin-top: 20px;
}
</style>
