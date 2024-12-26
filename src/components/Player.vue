<template>
  <Hand :hand="hand" :is-opponent="isOpponent" @discard-card="discardCard" />
</template>

<script>
import {Player} from "../javascript/Player.js";
import Hand from "./Hand.vue";
import {ref} from "vue";

export default {
  components: {Hand},
  props: ['isOpponent'],
  setup() {
    const hand = ref([]);

    // Discard a card from the player's hand
    function discardCard(card, isOpponent) {
      const index = hand.value.indexOf(card);
      if (index > -1) {
        hand.value.splice(index, 1);
      }
    }

    return { hand, discardCard };
  }
}
</script>

<style scoped>

</style>