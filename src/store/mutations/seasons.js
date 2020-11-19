export const seasons = {
  SEASONS_GET_CURRENT_SEASON_RESPONSE(state, payload) {
    state.currentSeason = payload.MRData.RaceTable.Races;
    return state;
  },
  SEASONS_GET_RESPONSE(state, payload) {
    state.all = payload.MRData.SeasonTable.Seasons;
    return state;
  },
  SEASONS_GET_SEASON_RESPONSE(state, payload) {
    state.season = payload.MRData.RaceTable.Races;
    return state;
  },
};

export default seasons;
