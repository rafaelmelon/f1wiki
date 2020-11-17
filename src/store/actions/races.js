import { API_F1 } from "/src/utils";

export const races = {
  async RACES_GET_RACE_RESULTS({ commit }, payload) {
    console.log("payload", payload)
    const response = await fetch(
      `${API_F1}${payload.season}/${payload.round}/results.json`
    );
    const result = await response.json();

    commit("RACES_GET_RACE_RESULTS_RESPONSE", result);
  },
};

export default races;
