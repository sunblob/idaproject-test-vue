<template>
  <div class="container"></div>
</template>

<script>
export default {
  async asyncData({ redirect }) {
    redirect('/categories');
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
