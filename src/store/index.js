import { createStore, createLogger } from "vuex";

import { DEV } from "/src/utils";
import seasons from "./modules/seasons";
import races from "./modules/races";

const store = createStore({
  modules: {
    seasons,
    races,
  },
  plugins: DEV ? [createLogger()] : [],
});

export default store;
