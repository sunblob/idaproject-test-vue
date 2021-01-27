import Vue from 'vue';

Vue.filter('priceFormat', (value) => {
  return value.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1 ');
});
