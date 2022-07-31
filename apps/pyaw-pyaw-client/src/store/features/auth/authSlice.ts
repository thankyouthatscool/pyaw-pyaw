import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  socketId?: string;
  username: string;
}

export interface AuthState {
  peers: User[];
  selectedPeer: { id: string; socketId: string; username: string } | null;
  user: User | null;
  wsConnected: boolean;
}

const initialState: AuthState = {
  peers: [],
  selectedPeer: null,
  user: null,
  wsConnected: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = null;
    },
    setPeers: (state, { payload }: PayloadAction<User[]>) => {
      state.peers = payload;
    },
    setSelectedPeer: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string;
        socketId: string;
        username: string;
      } | null>
    ) => {
      state.selectedPeer = payload;
    },
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    setWsConnected: (state, { payload }: PayloadAction<boolean>) => {
      state.wsConnected = payload;
    },
  },
});

export const {
  removeUser,
  setPeers,
  setSelectedPeer,
  setUser,
  setWsConnected,
} = authSlice.actions;

export default authSlice.reducer;
