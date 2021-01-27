<template>
  <div class="content">
    <div v-if="$fetchState.pending" class="loader">Loading....</div>
    <div v-else-if="$fetchState.error">Error while fetching products</div>
    <product-list v-else :products="sortedProducts" />
  </div>
</template>

<script>
export default {
  props: {
    sortBy: {
      type: String,
    },
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    sortedProducts() {
      if (this.sortBy === 'price') {
        return this.products.sort((a, b) => b.price - a.price);
      } else {
        return this.products.sort((a, b) => b.rating - a.rating);
      }
    },
  },
  watch: {
    '$route.query': '$fetch',
  },
  async fetch() {
    if (!this.$route.params.id) {
      return;
    }
    const id = this.$route.params.id;
    const products = await this.$axios.$get(`/product?category=${id}`);
    this.products = products;
  },
};
</script>
