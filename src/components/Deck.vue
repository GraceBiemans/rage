<template>
  <div class="deck">
<!--    <button @click="shuffleDeck">Shuffle</button>-->
    <button v-if="buttonVisible" @click="startGame">Start Game</button>
  </div>
</template>

<script>
import {Deck} from '../javascript/Deck.js'; // Import the Deck class

export default {
  data() {
    return {
      deck: new Deck(),
      buttonVisible: true,
    };
  },
  methods: {
    shuffleDeck() {
      this.deck.shuffle();
    },
    startGame() {
      this.buttonVisible = false;

      // Deal hand to player
      for (let i = 0; i < 10; i++) {
        this.$emit('deal-card', this.deck.dealCard(), 'player');
      }

      // Deal hand to opponent 1
      for (let i = 0; i < 10; i++) {
        this.$emit('deal-card', this.deck.dealCard(), 'opponent1');
      }

      // Deal hand to opponent 2
      for (let i = 0; i < 10; i++) {
        this.$emit('deal-card', this.deck.dealCard(), 'opponent2');
      }

      this.$emit('sort-hands');

      this.$emit('create-trump-pile', this.deck.getRemainingCards());

      this.$emit('start-game');
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
