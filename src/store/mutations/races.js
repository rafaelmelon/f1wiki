export const races = {
  RACES_GET_RACE_RESULTS_RESPONSE(state, payload) {
    state.raceResults = payload.MRData.RaceTable.Races[0];
    return state;
  },
};

export default races;
