<template>
  <div :class="['hand', { 'opponent-hand': isOpponent }]">
    <div class="card" v-for="(card, index) in hand" :key="index" :style="cardStyle(index, isOpponent)">
      <Card :value="card.value" :color="card.color"></Card>
      <button @click="playCard(card, isOpponent)">Play Card</button>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: {Card},
  props: ['hand', 'isOpponent'],
  methods: {
    playCard(card, isOpponent) {
      this.$emit('play-card', card, isOpponent);
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
    },

    cardStyle(index, isOpponent) {
      // Calculate the angle for each card to create a hand effect
      const spread = 10;  // Degree of spread
      let angle = 0;

      if (this.hand.length % 2 === 0) {
        angle = (index + .5 - Math.floor(this.hand.length / 2)) * spread;
      }
      else {
        angle = (index - Math.floor(this.hand.length / 2)) * spread;
      }

      let topEquation = Math.abs(angle) ** 2 / 13;
      const leftEquation = Math.sign(angle * -1) * ((angle ** 2) / 12);

      if (isOpponent) {
        angle = angle + 180 + (angle * -2);
        topEquation *= -1;
      }

      return {
        top: `${ topEquation }px`,
        left: `${ leftEquation }px`,
        transform: `rotate(${ angle }deg)`,
        zIndex: this.hand.length - index, // Ensure cards at the back are stacked behind
      };
    },

    getIndexByColor(hand) {
      // const colorCards = hand.filter(card => card.color === color);
      // console.log(hand.filter(card => card.color === 'purple'));
    }
  },
};
</script>

<style scoped>
.hand {
  display: flex;
  justify-content: center;  /* Center the hand horizontally */
  align-items: center;      /* Vertically align the cards */
  margin-top: 20px;         /* Adjust the spacing as needed */
  position: relative;       /* Positioning for overlap effect */
  perspective: 1000px;      /* Add perspective for 3D effect */
}

.hand.opponent-hand {
  margin-top: 100px;        /* Add extra top padding for opponent's hand */
}

.card {
  position: relative;
  transform: rotate(0deg);  /* Initial rotation (will be changed dynamically) */
  transition: transform 0.3s ease;  /* Smooth transition when cards are moved */
}

button {
  position: absolute;
  bottom: -25px;            /* Position the discard button below the card */
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  color: black;
  border-color: black;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 3px;
}

.card button:hover {
  background-color: grey;
}
</style>
