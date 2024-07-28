/*
import { StatsState, StatsAction, StatsFilter } from "./types";

export const initialState: StatsState = {
  filter: StatsFilter.ALL,
};

export const statsReducer = (state: StatsState, action: StatsAction): StatsState => {
  switch (action.type) {
    case 'GET_STATS':
      return {
        ...state,
        ...action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload?.filter ?? StatsFilter.ALL,
      };
    default:
      return state;
  }
};
*/