/*import { createContext, useReducer, useMemo, ReactNode, Dispatch } from "react";
import { StatsState, StatsAction } from "./types";
import { statsReducer, initialState } from "./reducer";

const StatsContext = createContext<{
  state: StatsState;
  dispatch: Dispatch<StatsAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(statsReducer, initialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
};

export { StatsContext, StatsProvider };

*/