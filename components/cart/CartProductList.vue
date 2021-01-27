<template>
  <div>
    <span :class="$style.desc">Товары в корзине</span>
    <div>
      <cart-product
        v-for="cartProduct in cartProductList"
        :key="cartProduct.id"
        :cartProduct="cartProduct"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartProductList: {
      type: Array,
    },
  },
};
</script>

<style lang="scss" module>
.desc {
  font-size: 18px;
  color: $gray-color;
  line-height: 24px;
  display: inline-block;

  margin-bottom: 16px;
}
</style>
