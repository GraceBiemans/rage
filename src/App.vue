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

      <div style="justify-content: center; display: flex">
        <Player ref="opponent1" player-type="opponent1" @next-turn="startHand"></Player>
        <Player ref="opponent2" player-type="opponent2" @next-turn="startHand"></Player>
      </div>

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
    const opponent1 = ref(null);
    const opponent2 = ref(null);

    function dealCard(card, playerType) {
      if (playerType === 'player') {
        if (player.value) {
          player.value.hand.push(card);
        }
      } else if (playerType === 'opponent1') {
        if (opponent1.value) {
          opponent1.value.hand.push(card);
        }
      }
      else if (playerType === 'opponent2') {
        if (opponent2.value) {
          opponent2.value.hand.push(card);
        }
      }
    }

    function sortHands() {
      Hand.methods.sortCards(player.value.hand);
      Hand.methods.sortCards(opponent1.value.hand);
      Hand.methods.sortCards(opponent2.value.hand);
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
      opponent1.value.playTurn();
      opponent2.value.playTurn();
    }

    return { trumpPile, dealCard, sortHands, createTrumpPile, startHand, cardPlayed, player, opponent1, opponent2, showRules, gameOver, userTurn };
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
