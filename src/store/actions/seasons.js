import { API_F1 } from "/src/utils";

export const seasons = {
  async SEASONS_GET({ commit }) {
    const response = await fetch(`${API_F1}seasons.json?limit=30&offset=60`);
    const payload = await response.json();

    commit("SEASONS_GET_RESPONSE", payload);
  },
};

export default seasons;
