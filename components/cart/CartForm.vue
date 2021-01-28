<template>
  <div>
    <span :class="$style.desc">Оформить заказ</span>
    <form :class="$style.form">
      <!-- NAME -->
      <div :class="$style.formInput">
        <input type="text" placeholder="Ваше имя" v-model="form.name" />
        <div v-if="$v.form.name.$error" class="form-error">
          <span v-if="!$v.form.name.required" class="help">
            Name is required
          </span>
        </div>
      </div>

      <!-- Phone -->
      <div :class="$style.formInput">
        <input
          type="text"
          placeholder="Телефон"
          v-model="form.phone"
          v-mask="'+7 (###) ###-##-##'"
        />
        <div v-if="$v.form.phone.$error" class="form-error">
          <span v-if="!$v.form.phone.required" class="help">
            Phone is required
          </span>
          <span v-if="!$v.form.phone.minLength" class="help">
            Phone length must be 11 digits
          </span>
        </div>
      </div>

      <!-- Address -->
      <div :class="$style.formInput">
        <input type="text" placeholder="Адрес" v-model="form.address" />
        <div v-if="$v.form.address.$error" class="form-error">
          <span v-if="!$v.form.address.required" class="help">
            Address is required
          </span>
        </div>
      </div>
      <button
        :class="$style.cartButton"
        @click.prevent="submitForm"
        :disabled="!isFormValid && $v.form.$dirty"
      >
        Отправить
      </button>
    </form>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  data: () => ({
    form: {
      name: '',
      phone: '',
      address: '',
    },
  }),
  computed: {
    isFormValid() {
      return !this.$v.form.$invalid;
    },
  },
  validations: {
    form: {
      name: {
        required,
      },
      phone: {
        required,
        minLength: minLength(18),
      },
      address: {
        required,
      },
    },
  },
  methods: {
    submitForm() {
      this.$v.form.$touch();

      if (this.isFormValid) {
        this.$store.commit('cart/setCartItems', []);
        this.form.name = '';
        this.form.phone = '';
        this.form.address = '';
        this.$emit('show-message');
      }
    },
  },
};
</script>

<style lang="scss" module>
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
      font-family: 'PT Sans', sans-serif;

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

.cartButton {
  background: $black-color;
  border-radius: 8px;
  width: 100%;
  color: $white-color;
  padding-top: 14px;
  padding-bottom: 14px;

  &:disabled,
  &:hover {
    background-color: $gray-color;
  }
}
</style>
