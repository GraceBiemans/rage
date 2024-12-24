<template>
  <div class="hand">
    <h2>Your Hand</h2>
    <div class="card" v-for="(card, index) in hand" :key="index">
      <span>{{ card.value }} of {{ card.color }}</span>
      <button @click="discardCard(card)">Discard</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['hand'],
  methods: {
    discardCard(card) {
      this.$emit('discard-card', card);
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
