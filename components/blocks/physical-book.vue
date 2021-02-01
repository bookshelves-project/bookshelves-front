<template>
  <div class="flex">
    <div class="book-container">
      <div class="book">
        <img :src="cover" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhysicalBook',
  props: {
    cover: {
      type: String,
      default: '/images/no-cover.webp',
    },
  },
}
</script>

<style scoped>
.book-container {
  width: 200px;
  height: 300px;
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 500px;
}

.book {
  transform: rotateY(-20deg);
  position: relative;
  transform-style: preserve-3d;
  width: 200px;
  height: 300px;
}

.book > :first-child {
  position: absolute;
  background: #0d47a1aa;
  width: 200px;
  height: 300px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

.book::before {
  content: ' ';
  background: #fff;
  height: calc(300px - 2 * 3px);
  width: 50px;
  top: 3px;
  position: absolute;
  transform: translateX(calc(200px - 50px / 2 - 3px)) rotateY(90deg)
    translateX(calc(50px / 2));
}

.book::after {
  content: ' ';
  position: absolute;
  left: 0;
  width: 200px;
  height: 300px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  background: #01060f;
  transform: translateZ(-50px);
}
</style>
