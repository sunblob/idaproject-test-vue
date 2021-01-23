<template>
  <transition name="fade">
    <div :class="$style.cartModal" v-if="showModal" @click.self="closeModal">
      <div :class="$style.cart">
        <div class="flex">
          <h2 :class="$style.title">Корзина</h2>
          <times-icon :class="$style.closeIcon" @click="closeModal" />
        </div>
        <div v-if="amount !== 0">
          <span :class="$style.desc">Товары в корзине</span>
          <div>
            <div v-for="item in items" :key="item.id" :class="$style.card">
              <img :src="`https://frontend-test.idaproject.com${item.photo}`" />
              <div :class="$style.itemInfo">
                <div :class="$style.productName">{{ item.name }}</div>
                <div :class="$style.productPrice">{{ item.price }} ₽</div>
                <div :class="$style.ratingWrapper">
                  <star-icon />
                  <div :class="$style.productRating">{{ item.rating }}</div>
                </div>
              </div>
              <garbage-icon
                @click="removeItem(item)"
                :class="$style.deleteItemIcon"
              />
            </div>
          </div>
          <span :class="$style.desc">Оформить заказ</span>
          <form :class="$style.form">
            <div :class="$style.formInput">
              <input type="text" placeholder="Ваше имя" v-model="form.name" />
            </div>
            <div :class="$style.formInput">
              <input
                type="text"
                placeholder="Телефон"
                v-model="form.phone"
                v-mask="'+7 (###) ###-##-##'"
              />
            </div>
            <div :class="$style.formInput">
              <input type="text" placeholder="Адрес" v-model="form.address" />
            </div>
            <div v-if="error" :class="$style.formError">{{ error }}</div>
            <button
              :class="$style.cartButton"
              @click.prevent="submitForm"
              :disabled="disableButton"
            >
              Отправить
            </button>
          </form>
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
import GarbageIcon from '@/assets/icons/garbage_22.svg?inline';
import StarIcon from '@/assets/icons/star_14.svg?inline';

export default {
  components: {
    GarbageIcon,
    TimesIcon,
    StarIcon,
  },
  data: () => ({
    form: {
      name: '',
      phone: '',
      address: '',
    },
    error: '',
    disableButton: false,
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
    removeItem(item) {
      this.$store.dispatch('cart/removeItemFromCart', item);
    },
    closeModal() {
      this.$emit('close-modal');
    },
    submitForm() {
      if (
        !this.form.name.trim().length ||
        !this.form.phone.trim().length ||
        !this.form.address.trim().length
      ) {
        this.error = 'Заполните все поля!';
        this.disableButton = true;
      } else {
        this.$store.commit('cart/setCartItems', []);
        this.form.name = '';
        this.form.phone = '';
        this.form.address = '';
        this.showSubmitMessage = true;
        setTimeout(() => {
          this.showSubmitMessage = false;
        }, 5000);
      }
    },
  },
};
</script>

<style lang="scss" module>
.ratingWrapper {
  display: flex;
}

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

.form {
  display: flex;
  flex-direction: column;
  .formInput {
    margin-bottom: 16px;
    width: 100%;

    & > input {
      width: 100%;
      background-color: $grey-extra-light-color;
      border-radius: 8px;
      padding: 15px;
      border: none;

      &:focus {
        outline: none;
        box-shadow: 0 0 1px 1px #42cef5;
      }
    }
  }

  .formError {
    color: red;
  }
}

.desc {
  font-size: 18px;
  color: $gray-color;
  line-height: 24px;
  display: inline-block;

  margin-bottom: 16px;
}

.card {
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

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
