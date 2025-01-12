<template>
  <div v-if="playerType === 'player'">
    <div v-if="playedCard" class="playedCard player">
      <Card style="transform: scale(0.75, 0.75);" :value="playedCard.value" :color="playedCard.color" />
    </div>
    <Hand :hand="hand" :playerType="playerType" @play-card="playCard" />
  </div>

  <div v-else-if="playerType === 'opponent1'" style="display: flex; justify-content: flex-end; width: 100%">
    <Hand :hand="hand" :playerType="playerType" @play-card="playCard" />
    <div v-if="playedCard" class="playedCard opponent">
      <Card style="transform: scale(0.75, 0.75);" :value="playedCard.value" :color="playedCard.color" />
    </div>
  </div>

  <div v-else-if="playerType === 'opponent2'" style="display: flex; justify-content: flex-start; width: 100%">
    <div v-if="playedCard" class="playedCard opponent">
      <Card style="transform: scale(0.75, 0.75);" :value="playedCard.value" :color="playedCard.color" />
    </div>
    <Hand :hand="hand" :playerType="playerType" @play-card="playCard" />
  </div>
</template>

<script>
import {Player} from "../javascript/Player.js";
import Hand from "./Hand.vue";
import {ref} from "vue";
import Card from "./Card.vue";

export default {
  components: {Card, Hand},
  props: ['playerType'],
  setup(props, { emit }) {
    const hand = ref([]);

    let playedCard = ref(null);

    // Discard a card from the player's hand
    function playCard(card) {
      const index = hand.value.indexOf(card);
      console.log(card);
      if (index > -1) {
        playedCard.value = hand.value.splice(index, 1)[0];
        console.log(playedCard.value.color);
      }
      emit('card-played', card);
    }

    function playTurn() {
      setTimeout(() => {
        Hand.methods.getIndexByColor(hand)
        playedCard.value = hand.value.splice(0, 1)[0];
      }, 1500)
    }

    function clearPlayedCard() {
      console.log("CLEAR");
      playedCard.value = null;
    }

    return { hand, playedCard, playCard, playTurn, clearPlayedCard };
  }
}
</script>

<style scoped>
.playedCard {
  display: flex;
}

.playedCard.player {
  justify-content: center;
}

.playedCard.opponent {
  align-items: flex-end;
}
</style>