<template>
  <div :class="$style.cardList">
    <product v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" module>
.cardList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  padding-bottom: 4rem;
}
</style>
