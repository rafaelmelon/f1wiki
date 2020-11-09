export const seasons = {
  SEASONS_GET_RESPONSE(state, payload) {
    state.all = payload.MRData.SeasonTable.Seasons;
    return state;
  },
  SEASONS_GET_SEASON_RESPONSE(state, payload) {
    state.season = payload.MRData.SeasonTable.Seasons[0];
    return state;
  },
};

export default seasons;
