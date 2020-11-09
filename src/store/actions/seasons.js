import { API_F1 } from "/src/utils";

export const seasons = {
  async SEASONS_GET({ commit }) {
    const response = await fetch(`${API_F1}seasons.json?limit=30&offset=60`);
    const result = await response.json();

    commit("SEASONS_GET_RESPONSE", result);
  },
  async SEASONS_GET_SEASON({ commit }, payload) {
    const response = await fetch(`${API_F1}${payload}/seasons.json`);
    const result = await response.json();

    commit("SEASONS_GET_SEASON_RESPONSE", result);
  },
};

export default seasons;
