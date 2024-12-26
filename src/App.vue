<template>
  <div id="app">
    <h1>Rage Card Game</h1>

    <!-- Button to open the rules modal -->
    <button @click="showRules = true">Show Rules</button>
    <!-- RulesModal component, passing the visibility state -->
    <RulesModal :visible="showRules" @update:visible="showRules = $event" />

    <Deck @deal-card="dealCard" @create-trump-pile="createTrumpPile"/>

    <TrumpPile :cards="trumpPile"></TrumpPile>

    <Player ref="player" :isOpponent="false"></Player>
    <Player ref="opponent" :isOpponent="true"></Player>

  </div>
</template>

<script type="application/javascript">
import {ref} from 'vue';
import Deck from './components/Deck.vue';
import Hand from './components/Hand.vue';
import RulesModal from "./components/RulesModal.vue";
import TrumpPile from "./components/TrumpPile.vue";
import Player from "./components/Player.vue";

export default {
  components: {Player, TrumpPile, RulesModal, Deck, Hand },
  data() {
    return {
      showRules: false
    };
  },
  setup() {
    const round = 1;

    const trumpPile = ref([]);

    // Refs for Player components
    const player = ref(null);
    const opponent = ref(null);

    function dealCard(card, playerType) {
      if (playerType === 'player') {
        if (player.value) {
          player.value.hand.push(card);
        }
      } else {
        if (opponent.value) {
          opponent.value.hand.push(card);
        }
      }
    }

    // The remaining un-dealt cards go to the trump pile
    function createTrumpPile(cards) {
      cards.forEach(card => {
        trumpPile.value.push(card)
      });
    }

    return { trumpPile, dealCard, createTrumpPile, player, opponent };
  },
};
</script>

<style scoped>
#app {
  text-align: center;
}
</style>
