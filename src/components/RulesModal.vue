<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal-content">
      <div @click="close" class="close-btn">&times;</div>
      <h2>Game Rules</h2>
      <ul>
        <li>
          <b>Object</b>
          <div>Be the player with the highest score by accurately bidding on the number of tricks you will win per round.</div>
        </li>

        <li>
          <b>Trump Pile</b>
          <div>The top card from this stack determines the trump color for the current round.</div>
        </li>

        <li>
          <b>Bidding</b>
          <div>Each player considers how many tricks they plan to win this round ranging from zero to the total number of cards in hand.</div>
        </li>

        <li>
          <b>Hand</b>
          <div>In the first round, each player is dealt ten cards. With each card, a player could win a trick.</div>
          <div>In the second round, each player is dealt nine cards. In the third round, each player is dealt eight cards, then seven cards, etc., until the tenth and final round when each player receives only one card.</div>
        </li>

        <li>
          <b>Your Turn</b>
          <div>Play any card that follows the suit. If it is not possible to follow suit, the player may play any card from their hand including a trump or action card.</div>
        </li>

        <li>
          <b>Trick</b>
          <div>Each player plays one card from their hand face up – this makes one trick.</div>
          <div>The trick is won by the highest numbered card of the lead suit. But, if any trump cards are played in the trick, the trick has been trumped, and the highest trump card wins the trick</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false); // Emit event to close the modal
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: lightgrey;
  padding: 20px;
  border-radius: 8px;
  width: 60%;
  max-width: 600px;
  text-align: center;
}

.close-btn {
  position: relative;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
}

ul {
  text-align: left;
  padding: 0;
}

ul li {
  margin: 10px 0;
}

h2 {
  margin-top: 0;
}
</style>
