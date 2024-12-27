<template>
  <h2>Trump Pile</h2>

<!--  <div v-for="(card, index) in cards" :key="index">-->
  <div v-if="cards[0]">
    <span>{{ cards[0].value }} of {{ cards[0].color }}</span>
<!--    <button @click="discardCard(card, isOpponent)">Discard</button>-->
  </div>
</template>

<script>
import {onMounted, watch} from "vue";

export default {
  props: ['cards'],
  setup(props) {

    // Return true if the card is an action card
    function isActionCard(card) {
      return !/\d/.test(card);
    }

    watch(() => props.cards, (newCards) => {
      if (newCards && newCards.length > 0 && isActionCard(newCards[0].value)) {
        console.log('Removing ' + props.cards[0].value + ' of ' + props.cards[0].color + ' from the trump pile.');
        newCards.shift(); // Remove the first card if it is an Action card
      }
    }, { deep: true });

    return {
      cards: props.cards
    };
  }
};
</script>

<style scoped>
</style>
