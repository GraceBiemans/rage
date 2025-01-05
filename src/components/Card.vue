<template>
  <div class="card" :style="{ backgroundColor: cardColor }">
    <div class="card-content">
      <span class="card-value">{{ value }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['value', 'color'],
  computed: {
    cardColor() {
      switch (this.color.toLowerCase()) {
        case 'red':
          return 'red';
        case 'purple':
          return 'purple';
        case 'orange':
          return 'orange';
        case 'black':
          return 'black';
        case 'green':
          return 'green';
        case 'blue':
          return 'blue';
        case 'yellow':
          return 'yellow';
      }
    }
  }
}
</script>

<style scoped>
.card {
  width: 100px;
  height: 150px;
  background-color: #fff;
  border-radius: 15px;
  border: 2px solid #000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  overflow: hidden;
}

.card.is-selected {
  border: 2px solid green;
}

.card-content {
  text-align: center;
  font-size: 30px;
  font-family: 'Arial', sans-serif;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.card-suit {
  font-size: 16px;
  color: #555;
}

</style>
