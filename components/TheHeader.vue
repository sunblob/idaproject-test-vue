<template>
  <div>
    <header :class="$style.header">
      <div :class="$style.container" class="wrapper">
        <div :class="$style.logo">TestList</div>
        <div :class="$style.cartIcon">
          <cart-icon @click="openModal" />
          <div v-if="amount !== 0" :class="$style.cartItemsNumber">
            {{ amount }}
          </div>
        </div>
      </div>
    </header>
    <cart-modal :showModal="showModal" @close-modal="closeModal" />
  </div>
</template>

<script>
import CartIcon from '@/assets/icons/cart_24.svg?inline';

export default {
  components: {
    CartIcon,
  },
  data: () => ({
    showModal: false,
  }),
  computed: {
    amount() {
      return this.$store.getters['cart/numberItemsInCart'];
    },
    items() {
      return this.$store.getters['cart/items'];
    },
  },
  methods: {
    closeModal() {
      this.showModal = false;
      document.body.classList.remove('modal-open');
    },
    openModal() {
      this.showModal = true;
      document.body.classList.add('modal-open');
    },
  },
};
</script>

<style lang="scss" module>
.cartItemsNumber {
  position: absolute;
  top: -4px;
  right: -4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  color: $white-color;
  background-color: $grey-light-color;
  font-size: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cartIcon {
  position: relative;

  &:hover {
    cursor: pointer;
  }
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.header {
  background-color: #fff;
  height: 66px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 0px 0px 8px 8px;
  width: 100%;
}

.logo {
  font-size: 22px;
  font-weight: 700;
  color: $gray-color;
  //   color: #59606d;
  line-height: 28px;
}
</style>
