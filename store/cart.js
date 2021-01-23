export const state = () => ({
  items: [],
});

export const mutations = {
  addItem(state, payload) {
    state.items.push(payload);
  },
  removeItem(state, payload) {
    state.items = state.items.filter((item) => item.id != payload.id);
  },
  setCartItems(state, payload) {
    state.items = payload;
  },
};

export const actions = {
  addItemToCart(store, item) {
    store.commit('addItem', item);
    store.dispatch('updateLocalCart');
  },
  removeItemFromCart(store, item) {
    store.commit('removeItem', item);
    store.dispatch('updateLocalCart');
  },
  toggleItemInCart(store, item) {
    const foundItem = store.state.items.find((i) => i.id === item.id);
    if (!foundItem) {
      store.dispatch('addItemToCart', item);
    } else {
      store.dispatch('removeItemFromCart', item);
    }
    store.dispatch('updateLocalCart');
  },
  updateLocalCart(store) {
    if (process.browser) {
      localStorage.setItem('cartItems', JSON.stringify(store.state.items));
    }
  },
};

export const getters = {
  numberItemsInCart: (state) => state.items.length,
  items: (state) => state.items,
  isInCart: (state) => (id) => !!state.items.find((item) => item.id == id),
};
