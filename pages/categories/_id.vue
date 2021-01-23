<template>
  <div class="content">
    <div>
      <div :class="$style.cardList">
        <div :class="$style.card" v-for="product in products" :key="product.id">
          <div :class="$style.cardTop">
            <div :class="$style.ratingWrapper">
              <star-icon />
              <div :class="$style.productRating">{{ product.rating }}</div>
            </div>
            <img
              :src="`https://frontend-test.idaproject.com${product.photo}`"
              :class="$style.productImage"
            />
            <div v-if="!isInCart(product.id)">
              <cart-icon :class="$style.icon" @click="addItemToCart(product)" />
            </div>
            <div v-else>
              <garbage-icon
                :class="$style.icon"
                @click="removeItemFromCart(product)"
              />
            </div>
          </div>
          <div :class="$style.productName">{{ product.name }}</div>
          <div :class="$style.productPrice">{{ product.price }} ₽</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartIcon from '@/assets/icons/cart_14.svg?inline';
import GarbageIcon from '@/assets/icons/garbage_22.svg?inline';
import StarIcon from '@/assets/icons/star_14.svg?inline';

export default {
  components: {
    CartIcon,
    StarIcon,
    GarbageIcon,
  },
  computed: {
    isInCart() {
      return (id) => this.$store.getters['cart/isInCart'](id);
    },
  },
  methods: {
    toggleItemInCart(item) {
      this.$store.dispatch('cart/toggleItemInCart', item);
    },
    addItemToCart(item) {
      this.$store.dispatch('cart/addItemToCart', item);
    },
    removeItemFromCart(item) {
      this.$store.dispatch('cart/removeItemFromCart', item);
    },
  },
  async asyncData({ $axios, params }) {
    const id = params.id;
    const products = await $axios.$get(`/product?category=${id}`);
    return { products };
  },
};
</script>

<style lang="scss" module>
.icon {
  transition: fill 0.4s ease;
  width: 15px;
  height: 15px;
  //Не работает, не смог никак исправить
  &:hover {
    fill: $black-color;
    cursor: pointer;
    color: $black-color;
  }
}

.cardList {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.card {
  padding: 16px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.cardTop {
  display: flex;
  justify-content: space-between;
}

.ratingWrapper {
  display: flex;
}

.productRating {
  color: $yellow-color;
  font-size: 10px;
  font-weight: 700;
  line-height: 12px;
  padding: 2px;
}

.productImage {
  display: block;
  max-width: 100%;
  height: 180px;
  margin-bottom: 15px;
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
}
</style>
