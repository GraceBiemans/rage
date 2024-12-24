<template>
  <div id="app">
    <h1>Rage Card Game</h1>

    <!-- Button to open the rules modal -->
    <button @click="showRules = true">Show Rules</button>

    <!-- RulesModal component, passing the visibility state -->
    <RulesModal :visible="showRules" @update:visible="showRules = $event" />

    <Deck @deal-card="dealCard"/>
    <Hand :hand="playerHand" @discard-card="discardCard" />
  </div>
</template>

<script type="application/javascript">
import { ref } from 'vue';
import Deck from './components/Deck.vue';
import Hand from './components/Hand.vue';
import RulesModal from "./components/RulesModal.vue";

export default {
  components: {RulesModal, Deck, Hand },
  data() {
    return {
      // This controls the visibility of the modal
      showRules: false
    };
  },
  setup() {
    const playerHand = ref([]);

    // Deal a card to the player
    function dealCard(card) {
      console.log(card);
      playerHand.value.push(card);
    }

    // Discard a card from the player's hand
    function discardCard(card) {
      const index = playerHand.value.indexOf(card);
      if (index > -1) {
        playerHand.value.splice(index, 1);
      }
    }

    return { playerHand, dealCard, discardCard };
  },
};
</script>

<style scoped>
#app {
  text-align: center;
}
</style>
