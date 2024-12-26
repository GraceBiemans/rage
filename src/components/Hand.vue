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
