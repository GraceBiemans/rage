<template>
  <h2>Trump Pile</h2>

<!--  <div v-for="(card, index) in cards" :key="index">-->
  <div v-if="cards[0]">
    <span>{{ cards[0].value }} of {{ cards[0].color }}</span>
<!--    <button @click="discardCard(card, isOpponent)">Discard</button>-->
  </div>
</template>

<script>
export default {
  props: ['cards'],
  methods: {
    // discardCard(card, isOpponent) {
    //   this.$emit('discard-card', card, isOpponent);
    // },
  },
};
</script>

<style scoped>
</style>
