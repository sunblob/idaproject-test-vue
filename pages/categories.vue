<template>
  <div class="page">
    <div :class="$style.head">
      <h2 :class="$style.title">Каталог</h2>
      <product-sort :options="['цене', 'популярности']" @input="chooseSort" />
    </div>
    <div :class="$style.content">
      <aside>
        <ul :class="$style.list">
          <li v-for="category in categories" :key="category.id">
            <nuxt-link
              :to="{
                name: 'categories-id',
                params: { id: category.id },
              }"
              :class="$style.listItem"
            >
              {{ category.name }}
            </nuxt-link>
          </li>
        </ul>
      </aside>
      <nuxt-child :sortBy="sort" />
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Категории',
    };
  },
  data() {
    return {
      sort: 'price',
    };
  },
  methods: {
    chooseSort(option) {
      if (option === 'цене') {
        this.sort = 'price';
      }

      if (option === 'популярности') {
        this.sort = 'rating';
      }
    },
  },
  async asyncData({ $axios, redirect }) {
    const categories = await $axios.$get(`/product-category`);

    if (categories) {
      redirect({
        name: 'categories-id',
        params: { id: categories[0].id },
      });
    }

    return { categories };
  },
  mounted() {
    if (localStorage.getItem('cartItems')) {
      try {
        const items = JSON.parse(localStorage.getItem('cartItems'));
        if (items.length !== 0) {
          this.$store.commit('cart/setCartItems', items);
        }
      } catch (e) {
        localStorage.removeItem('cartItems');
      }
    }
  },
};
</script>

<style lang="scss" module>
.content {
  display: flex;
}

.list {
  list-style: none;
  margin-right: 22px;

  li {
    margin-bottom: 16px;

    .listItem {
      color: $grey-light-color;
      text-decoration: none;

      &:hover {
        color: $grey-color;
      }
    }
  }
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.title {
  color: $black-color;
  font-weight: 700;
  font-size: 32px;
  line-height: 41px;
}

.sort {
  color: $black-color;
}
</style>
