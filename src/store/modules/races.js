import actions from "../actions/races";
import mutations from "../mutations/races";

const defaultState = {
  raceResults: {},
};

export const races = {
  state: () => defaultState,
  mutations,
  actions,
  getters: {
    raceResults: (state) => {
      return state.raceResults;
    },
  },
};

export default races;
