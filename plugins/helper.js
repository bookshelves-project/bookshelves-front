import Vue from 'vue'

const capitalize = (string = '') =>
  [...string]
    .map(
      // Convert to array with each item is a char of
      // string by using spread operator (...)
      (char, index) => (index ? char : char.toUpperCase()) // Index true means not equal 0, so (!index) is
      // the first character which is capitalized by
      // the `toUpperCase()` method
    )
    .join('') // Return back to string

Vue.prototype.$capitalize = capitalize
