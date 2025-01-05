<template>
  <Hand :hand="hand" :is-opponent="isOpponent" @play-card="playCard" />
</template>

<script>
import {Player} from "../javascript/Player.js";
import Hand from "./Hand.vue";
import {ref} from "vue";

export default {
  components: {Hand},
  props: ['isOpponent'],
  setup(props, { emit }) {
    const hand = ref([]);

    // Discard a card from the player's hand
    function playCard(card) {
      const index = hand.value.indexOf(card);
      console.log(card);
      if (index > -1) {
        hand.value.splice(index, 1);
      }
      emit('card-played', card);
    }

    function playTurn() {
      setTimeout(() => {
        Hand.methods.getIndexByColor(hand)
        hand.value.splice(0, 1);
        this.$emit('next-turn');
      }, 1500)
    }

    return { hand, playCard, playTurn };
  }
}
</script>

<style scoped>

</style>