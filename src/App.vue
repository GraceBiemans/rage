<template>
  <div id="app">
    <h1>Ryan's Rage</h1>

    <div v-if="gameOver">
      <h2>Game Over!</h2>
    </div>

    <div v-else>
      <button @click="showRules = true">Show Rules</button>
      <RulesModal :visible="showRules" @update:visible="showRules = $event" />

      <Deck @deal-card="dealCard" @sort-hands="sortHands" @create-trump-pile="createTrumpPile" @start-game="startHand"/>

      <Player ref="opponent" :isOpponent="true" @next-turn="startHand"></Player>

      <TrumpPile :cards="trumpPile"></TrumpPile>

      <div v-if="userTurn"><PlayerPrompt></PlayerPrompt></div>

      <Player ref="player" :isOpponent="false" @card-played="cardPlayed"></Player>
    </div>

  </div>
</template>

<script type="application/javascript">
import {ref} from 'vue';
import Deck from './components/Deck.vue';
import Hand from './components/Hand.vue';
import RulesModal from "./components/RulesModal.vue";
import TrumpPile from "./components/TrumpPile.vue";
import Player from "./components/Player.vue";
import PlayerPrompt from "./components/PlayerPrompt.vue";

export default {
  components: {PlayerPrompt, Player, TrumpPile, RulesModal, Deck, Hand },
  setup() {
    const round = 1;

    const showRules = ref(false);
    const gameOver = ref(false);
    const userTurn = ref(false);

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

    function sortHands() {
      Hand.methods.sortCards(player.value.hand);
      Hand.methods.sortCards(opponent.value.hand);
    }

    // The remaining un-dealt cards go to the trump pile
    function createTrumpPile(cards) {
      cards.forEach(card => {
        trumpPile.value.push(card)
      });
    }

    function startHand() {
      userTurn.value = true;
    }

    function cardPlayed() {
      userTurn.value = false;
      opponent.value.playTurn();
    }

    return { trumpPile, dealCard, sortHands, createTrumpPile, startHand, cardPlayed, player, opponent, showRules, gameOver, userTurn };
  },
};
</script>

<style scoped>
#app {
  text-align: center;
}

h1 {
  color: white;
}
</style>
