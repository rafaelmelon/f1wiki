import { createStore, createLogger } from "vuex";

import { DEV } from '/src/utils'

const store = createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    INCREMENT(state) {
      state.count++;
    },
    DECREMENT(state) {
      state.count--;
    },
  },
  plugins: DEV ? [createLogger()] : [],
});

export default store;
