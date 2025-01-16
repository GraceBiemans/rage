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
      if (index > -1) {
        playedCard.value = hand.value.splice(index, 1)[0];
      }
      emit('card-played', card);
    }

    function playTurn(leadCard, trumpPile) {

      if (leadCard.color === 'black') {
        setTimeout(() => {
          // TODO: if card laid is black, can play any card
          playedCard.value = hand.value.splice(0, 1)[0];
        }, 1500)
        console.log("Lead was black, played any card");
      }
      // if card is not black
      else {
        const cardsInSuit = getCardsInSuit(leadCard);

        // If there are no cards of the leading suit, can play any card.
        if (cardsInSuit.length === 0) {
          const highestTrumpCard = getHighestCardByColor(trumpPile.value[0].color);

          if (highestTrumpCard) {
            const cardIndex = hand.value.indexOf(highestTrumpCard);
            setTimeout(() => {
              playedCard.value = hand.value.splice(cardIndex, 1)[0];
            }, 1500)
            console.log("No cards in suit, played highest trump card.");
          }

          else {
            setTimeout(() => {
              // TODO: no matching trump cards
              playedCard.value = hand.value.splice(0, 1)[0];
            }, 1500)
            console.log("No matching trump cards");
          }
        }
        else {
          // play highest suit-matching card
          setTimeout(() => {
            const cardIndex = hand.value.indexOf(cardsInSuit[cardsInSuit.length - 1]);
            playedCard.value = hand.value.splice(cardIndex, 1)[0];
          }, 1500)
          console.log("played highest suit-matching card.");
        }
      }
      return playedCard;
    }

    function getCardsInSuit(leadCard) {
      return hand.value.filter(card => {
        return card.color === leadCard.color;
      });
    }

    function getHighestCardByColor(color) {
      // Filter the cards by color
      const filteredCards = hand.value.filter(card => card.color === color);

      if (filteredCards.length === 0) return null;

      // Find the card with the highest value
      return filteredCards.reduce((maxCard, currentCard) => {
        return currentCard;
      });
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