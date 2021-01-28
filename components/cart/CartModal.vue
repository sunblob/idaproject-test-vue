<template>
  <transition name="fade">
    <div :class="$style.cartModal" v-if="showModal" @click.self="closeModal">
      <div :class="$style.cart">
        <div class="flex">
          <h2 :class="$style.title">Корзина</h2>
          <times-icon :class="$style.closeIcon" @click="closeModal" />
        </div>
        <div v-if="amount !== 0">
          <cart-product-list :cartProductList="items" />
          <cart-form @show-message="showMessage" />
        </div>
        <div v-else-if="showSubmitMessage" :class="$style.messageWrapper">
          <img src="@/assets/ok_hand.png" alt="ok_hand" />
          <span :class="$style.messageTitle">Заявка успешно отправлена</span>
          <span :class="$style.messageSubtitle"
            >Вскоре наш менеджер свяжется с Вами</span
          >
        </div>
        <div v-else>
          <div :class="$style.subtitle">
            Пока что вы ничего не добавили в корзину
          </div>
          <button :class="$style.cartButton" @click="closeModal">
            Перейти к выбору
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import TimesIcon from '@/assets/icons/times_14.svg?inline';
export default {
  components: {
    TimesIcon,
  },
  data: () => ({
    showSubmitMessage: false,
  }),
  props: {
    showModal: {
      type: Boolean,
      defaul: false,
    },
  },
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
      this.$emit('close-modal');
    },
    showMessage() {
      this.showSubmitMessage = true;
      setTimeout(() => {
        this.showSubmitMessage = false;
      }, 5000);
    },
  },
};
</script>

<style lang="scss" module>
.messageWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  & > img {
    margin-bottom: 24px;
  }

  .messageTitle {
    font-size: 24px;
    font-weight: 700;
    line-height: 31px;
  }

  .messageSubtitle {
    line-height: 20px;
    color: $gray-color;
  }
}

.desc {
  font-size: 18px;
  color: $gray-color;
  line-height: 24px;
  display: inline-block;

  margin-bottom: 16px;
}

.closeIcon {
  cursor: pointer;
}

.cartModal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: flex-end;
  z-index: 100;
}

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

.cart {
  background-color: rgba(255, 255, 255, 1);
  width: 460px;
  padding: 48px 52px;
  box-shadow: -4px 0px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px 0px 0px 8px;

  & > div {
    margin-bottom: 24px;
    .title {
      color: $black-color;
      font-weight: 700;
      font-size: 32px;
      line-height: 41px;
    }
  }

  .subtitle {
    color: $black-color;
    font-size: 22px;
    line-height: 28px;
    margin-bottom: 24px;
  }

  .cartButton {
    background: $black-color;
    border-radius: 8px;
    width: 100%;
    color: $white-color;
    padding-top: 14px;
    padding-bottom: 14px;

    &:disabled {
      background-color: $gray-color;
    }
  }
}
</style>
