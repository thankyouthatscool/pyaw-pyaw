import { createSlice } from "@reduxjs/toolkit";

export interface UIState {
  isSidebarOpen: boolean;
  isUserSelectionModalOpen: boolean;
}

const initialState: UIState = {
  isSidebarOpen: true,
  isUserSelectionModalOpen: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    closeUserSelectModal: (state) => {
      state.isUserSelectionModalOpen = false;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    openUserSelectModal: (state) => {
      state.isUserSelectionModalOpen = true;
    },
  },
});

export const {
  closeSidebar,
  closeUserSelectModal,
  openSidebar,
  openUserSelectModal,
} = uiSlice.actions;

export default uiSlice.reducer;
