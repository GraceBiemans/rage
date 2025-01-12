<template>
  <div class="card" :style="{ backgroundColor: cardColor }">
    <div class="oval"></div>
    <div class="card-content">
      <div v-if="cardColor === 'black'">
        <span class="card-value action" :style="{ color: cardColor }">{{ value }}</span>
      </div>
      <div v-else>
        <span class="card-value" :style="{ color: cardColor }">{{ value }}</span>
      </div>
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
  width: 80px;
  height: 130px;
  background-color: #fff;
  border-radius: 15px;
  border: 2px solid #000;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 10px;
  overflow: hidden;
}

.card .oval {
  position: absolute;
  top: -20px; /* Adjusts the oval’s position */
  left: 10px;
  width: 80%; /* Make the oval larger */
  height: 130%;
  background-color: white;
  border-radius: 50%;
  transform: rotate(35deg); /* Rotates the oval */
  z-index: 1;
}

@media (max-width: 768px) {
  .card {
    width: 40px;
    height: 65px;
  }

  .card .oval {
    top: -20px;
    width: 90%;
    height: 140%;
  }
}

.card.is-selected {
  border: 2px solid green;
}

.card-content {
  text-align: center;
  font-size: 30px;
  font-family: 'Arial', sans-serif;
  z-index: 2; /* Ensures content stays on top */
}

.card-value {
  font-size: 50px;
  font-weight: bold;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
}

.card-value.action {
  font-size: 24px;
}

@media (max-width: 768px) {
  .card-value {
    font-size: 40px;
    font-weight: bold;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
  }
  .card-value.action {
    font-size: 14px;
  }
}
</style>
