<template>
  <div v-if="bid">
    Bid: {{ bid }}
  </div>
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

    let bid = null;

    let score = 0;

    // Discard a card from the player's hand
    function discardCard(card, isOpponent) {
      const index = hand.value.indexOf(card);
      if (index > -1) {
        hand.value.splice(index, 1);
      }
    }

    // function setBid(bid) {
    //   bid = bid;
    // }

    return { hand, bid, discardCard };
  }
}
</script>

<style scoped>

</style>