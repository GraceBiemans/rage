<template>
  <div id="app">
    <h1 class="rage">Ryan's Rage</h1>

    <div v-if="gameOver" class="gameOver">
      <h1>Game Over!</h1>
      <h2>{{ gameOverMessage }}</h2>
    </div>

    <div v-else>
      <button @click="showRules = true">Show Rules</button>
      <RulesModal :visible="showRules" @update:visible="showRules = $event" />

      <Deck @deal-card="dealCard" @sort-hands="sortHands" @create-trump-pile="createTrumpPile" @start-game="startHand"/>

      <ScoreTable :scores="tricksWon" ></ScoreTable>

      <div style="display: flex; justify-content: center; height: 300px; width: 100%">
        <Player ref="opponent1" player-type="opponent1"></Player>
        <TrumpPile :cards="trumpPile"></TrumpPile>
        <Player ref="opponent2" player-type="opponent2"></Player>
      </div>

      <div v-if="userTurn"><PlayerPrompt></PlayerPrompt></div>

      <Player ref="player" player-type="player" @card-played="playOpponentCards"></Player>
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
import ScoreTable from "./components/ScoreTable.vue";

export default {
  components: {ScoreTable, PlayerPrompt, Player, TrumpPile, RulesModal, Deck, Hand },
  setup() {
    let round = 1;
    let roundCards = {'player': null, 'opponent1': null, 'opponent2': null}
    let tricksWon = {'player': ref(0), 'opponent1': ref(0), 'opponent2': ref(0)}

    const showRules = ref(false);
    const gameOver = ref(false);
    let gameOverMessage = ref(null);
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

    function playOpponentCards() {
      roundCards['player'] = player.value.playedCard;
      userTurn.value = false;

      setTimeout(() => {
        roundCards['opponent1'] = opponent1.value.playTurn(player.value.playedCard, trumpPile, roundCards);
      }, 200)

      setTimeout(() => {
        roundCards['opponent2'] = opponent2.value.playTurn(player.value.playedCard, trumpPile, roundCards);
      }, 1500)

      setTimeout(() => {
        findRoundWinner();
      }, 4000)

      setTimeout(() => {
        clearPlayedCards();
      }, 5000);
    }

    function clearPlayedCards() {
      player.value.clearPlayedCard();
      opponent1.value.clearPlayedCard();
      opponent2.value.clearPlayedCard();

      gameOver.value = isGameOver();

      startHand();
    }

    function isGameOver() {
      gameOverMessage.value = getGameOverMessage();
      console.log(gameOverMessage.value);
      return player.value.hand.length === 0;
    }

    function getGameOverMessage() {
      console.log(tricksWon['player'].value);
      console.log(tricksWon['opponent1'].value);
      console.log(tricksWon['opponent2'].value);
      const highestScore = Math.max(tricksWon['player'].value, tricksWon['opponent1'].value, tricksWon['opponent2'].value);

      console.log(highestScore);
      if (highestScore === tricksWon['player'].value) {
        return '🎉 You Win! 🎉';
      }
      else {
        return 'Sucks to suck.'
      }
    }

    function findRoundWinner() {
      const trumpColor = trumpPile.value[0].color;

      const leadCard = roundCards.player;
      let winner = 'player';
      let bestCard = leadCard;

      // console.log("Best card " + bestCard.value);

      for (let opponent in roundCards) {

        let card = null;

        if (opponent !== 'player') {
          card = roundCards[opponent].value;
        }
        else {
          card = roundCards[opponent];
        }

        // console.log("Card* " + card.value);

        // Prioritize cards that are trump color
        if (card.color === trumpColor && (bestCard.color !== trumpColor || card.value > bestCard.value)) {
          console.log("Trump " + card.value);
          winner = opponent;
          bestCard = card;
        }

        // If the card is the same color as the lead card, compare values
        else if (bestCard.color !== trumpColor && card.color === leadCard.color && parseInt(card.value) > parseInt(bestCard.value)) {
          console.log(card.value + " > " + bestCard.value);
          console.log("Better than leadCard " + card.value);
          winner = opponent;
          bestCard = card;
        }
      }

      console.log("TRICK WINNER: " + bestCard.value + bestCard.color);

      console.log("VALUE BEFORE: " + tricksWon[winner].value)
      tricksWon[winner].value += 1;
      console.log("VALUE AFTER: " + tricksWon[winner].value)
    }

    return { trumpPile, dealCard, sortHands, createTrumpPile, startHand, playOpponentCards, player, opponent1, opponent2, showRules, gameOver, userTurn, tricksWon, gameOverMessage };
  },
};
</script>

<style scoped>
#app {
  text-align: center;
}

h1 {
  color: lightgrey;
}

h2 {
  color: lightgrey;
}

.gameOver {
  display: block;
  margin-top: 300px;
}

.rage {
  font-family: 'Impact', sans-serif;
  font-size: 64px;
  text-transform: uppercase;
  text-shadow: 5px 5px 10px rgba(255, 0, 0, 0.8), -5px -5px 10px rgba(255, 0, 0, 0.6); /* Chaotic shadow effect */
  animation: rage-animation 1s infinite alternate;  /* Adds a pulsating, rage-like effect */
}

@keyframes rage-animation {
  0% {
    transform: scale(1);
    color: lightgrey;
  }
  50% {
    transform: scale(1.1);
    color: grey;
  }
  100% {
    transform: scale(1);
    color: dimgrey;
  }
}
</style>
