import { createStore } from "zustand/vanilla";

export type DashboardState = {
  isOpen: boolean;
}

export type DashboardActions = {
  toggle: () => void;
}

export type DashboardStore = DashboardState & DashboardActions;

export const defaultInitialState: DashboardState = {
  isOpen: false,
}

export const createDashboardStore = (initialState:DashboardState = defaultInitialState, ) => {

  return createStore<DashboardStore>()((set) => ({
    ...initialState,
    toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  }))
}

