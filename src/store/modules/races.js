import actions from "../actions/races";
import mutations from "../mutations/races";

const defaultState = {
  race: {},
};

export const races = {
  state: () => defaultState,
  mutations,
  actions,
  getters: {
    race: (state) => {
      return state.race;
    },
  },
};

export default races;
