<template>
  <div class="deck">
    <button @click="shuffleDeck">Shuffle</button>
    <button @click="dealCard">Deal Card</button>
  </div>
</template>

<script>
import {Deck} from '../Deck.js'; // Import the Deck class

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
    dealCard() {
      for (let i = 0; i < 10; i++) {
        this.$emit('deal-card', this.deck.dealCard());
      }
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
