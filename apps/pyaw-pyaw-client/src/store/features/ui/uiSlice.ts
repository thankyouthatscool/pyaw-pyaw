import { createSlice } from "@reduxjs/toolkit";

export interface UIState {
  isSidebarOpen: boolean;
}

const initialState: UIState = {
  isSidebarOpen: true,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },

    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
  },
});

export const { closeSidebar, openSidebar } = uiSlice.actions;

export default uiSlice.reducer;
