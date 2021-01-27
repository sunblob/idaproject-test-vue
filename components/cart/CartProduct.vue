<template>
  <div :class="$style.card">
    <img :src="`https://frontend-test.idaproject.com${cartProduct.photo}`" />
    <div :class="$style.itemInfo">
      <div :class="$style.productName">{{ cartProduct.name }}</div>
      <div :class="$style.productPrice">{{ cartProduct.price }} ₽</div>
      <div :class="$style.ratingWrapper">
        <star-icon />
        <div :class="$style.productRating">{{ cartProduct.rating }}</div>
      </div>
    </div>
    <garbage-icon
      @click="removeItem(cartProduct)"
      :class="$style.deleteItemIcon"
    />
  </div>
</template>

<script>
import GarbageIcon from '@/assets/icons/garbage_22.svg?inline';
import StarIcon from '@/assets/icons/star_14.svg?inline';

export default {
  components: {
    GarbageIcon,
    StarIcon,
  },
  props: {
    cartProduct: {
      type: Object,
      required: true,
    },
  },
  methods: {
    removeItem(item) {
      this.$store.dispatch('cart/removeItemFromCart', item);
    },
  },
};
</script>

<style lang="scss" module>
.ratingWrapper {
  display: flex;
}

.card {
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;

  & > img {
    display: block;
    height: 90px;
    max-width: 100%;
  }

  .deleteItemIcon {
    cursor: pointer;
  }

  .itemInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-self: stretch;
    align-items: flex-start;
    flex-grow: 1;
  }

  .productName {
    font-size: 14px;
    color: $gray-color;
    line-height: 18px;
    margin-bottom: 10px;
  }

  .productPrice {
    color: $black-color;
    font-weight: 700;
    line-height: 18px;
    margin-bottom: auto;
  }

  .productRating {
    color: $yellow-color;
    font-size: 10px;
    font-weight: 700;
    line-height: 12px;
    margin-left: 3px;
    margin-top: 2px;
  }

  &:last-child {
    margin-bottom: 32px;
  }
}
</style>
