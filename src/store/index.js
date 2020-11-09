import { createStore, createLogger } from "vuex";

import { DEV } from "/src/utils";
import seasons from './modules/seasons'

const store = createStore({
  modules: {
    seasons,
  },
  plugins: DEV ? [createLogger()] : [],
});

export default store;
