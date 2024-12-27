<template>
  <div class="hand">
    <h2 v-if="isOpponent">Opponent Hand</h2>
    <h2 v-else>Your Hand</h2>

    <div class="card" v-for="(card, index) in hand" :key="index">
      <span>{{ card.value }} of {{ card.color }}</span>
      <button @click="discardCard(card, isOpponent)">Discard</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hand', 'isOpponent'],
  methods: {
    discardCard(card, isOpponent) {
      this.$emit('discard-card', card, isOpponent);
    },

    sortCards(hand) {
      hand = hand.sort((card1, card2) => {
        // Compare by color (alphabetical order)
        const colorComparison = card1.color.localeCompare(card2.color);
        if (colorComparison !== 0) return colorComparison;

        // Convert the values to numbers if they are strings that represent numbers
        const valueA = isNaN(card1.value) ? card1.value : Number(card1.value);
        const valueB = isNaN(card2.value) ? card2.value : Number(card2.value);

        if (typeof valueA === "number" && typeof valueB === "number") {
          return valueA - valueB;
        }

        if (typeof valueA === "number" && typeof valueB === "string") {
          return -1;
        }

        if (typeof valueA === "string" && typeof valueB === "number") {
          return 1;
        }

        // If both values are strings, sort alphabetically
        return valueA.localeCompare(valueB);
      });
    }
  },
};
</script>

<style scoped>
.hand {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {
  margin: 5px;
}
</style>
