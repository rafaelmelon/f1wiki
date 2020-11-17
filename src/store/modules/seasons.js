import actions from "../actions/seasons";
import mutations from "../mutations/seasons";

const defaultState = {
  all: [],
  season: {},
  currentSeason: [],
};

export const seasons = {
  state: () => defaultState,
  mutations,
  actions,
  getters: {
    allSeasons: (state) => {
      return state.all;
    },
  },
};

export default seasons;
