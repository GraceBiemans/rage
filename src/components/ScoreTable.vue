<template>
  <div class="score-table-container">
    <table class="score-table">
      <tbody>
      <tr>
        <td>Ryan</td>
        <td>{{ scores['player'] }}</td>
      </tr>
      <tr>
        <td>Opponent 1</td>
        <td>{{ scores['opponent1'] }}</td>
      </tr>
      <tr>
        <td>Opponent 2</td>
        <td>{{ scores['opponent2'] }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ScoreTable",
  props: {
    scores: {
      type: Object,
      required: true,
      validator(value) {
        return (
            value.hasOwnProperty('player') &&
            value.hasOwnProperty('opponent1') &&
            value.hasOwnProperty('opponent2')
        );
      }
    }
  }
};
</script>

<style scoped>
.score-table-container {
  padding: 20px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 20%;
}

.score-table {
  margin: 0 auto;
  border-collapse: collapse;
  width: 100%;
}

.score-table th,
.score-table td {
  border: 1px solid black;
  padding: 10px;
  text-align: center;
}

.score-table td {
  background-color: lightgrey;
}
</style>
