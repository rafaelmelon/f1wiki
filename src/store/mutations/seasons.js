export const seasons = {
  SEASONS_GET_RESPONSE(state, payload) {
    state.all = payload.MRData.SeasonTable.Seasons;
    return state;
  },
};

export default seasons;
