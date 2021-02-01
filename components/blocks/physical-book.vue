<template>
  <div>
    <!-- <div
      class="sfbook-banner-cover book-container"
      style="position: absolute; top: -15px; left: 35px"
    >
      <div class="book">
        <img alt="" :src="cover" />
      </div>
    </div> -->
    <div class="book-container">
      <div class="book">
        <v-lazy-image
          alt="Book cover"
          :src="cover"
          src-placeholder="/images/no-cover.webp"
          class="cover"
        />
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

<style lang="postcss" scoped>
.book-container {
  width: 200px;
  height: 300px;
  margin: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 400px;
}

.book {
  transform: rotateY(-30deg);
  position: relative;
  transform-style: preserve-3d;
  width: 200px;
  height: 300px;
  /* transition: transform 1s ease; */
  /* animation: 1s ease 0s 1 initAnimation; */
}

.book:hover {
  /* transform: rotate(0deg); */
}

@keyframes initAnimation {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(-30deg);
  }
}

.book > :first-child {
  position: absolute;
  background: #0d47a1aa;
  width: 200px;
  height: 300px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 5px 5px 20px #666;
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
  box-shadow: -10px 0 50px 10px #666;
}
</style>
