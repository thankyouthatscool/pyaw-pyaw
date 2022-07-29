import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id?: string;
  username: string;
}

export interface AuthState {
  availableUsers: User[];
  user: User | null;
  wsConnected: boolean;
}

const initialState: AuthState = {
  availableUsers: [
    { username: "trevor" },
    { username: "zach" },
    { username: "sam" },
    { username: "timmy" },
    { username: "darren" },
    { username: "sasha" },
  ],
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
    setUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    setWsConnected: (state, { payload }: PayloadAction<boolean>) => {
      state.wsConnected = payload;
    },
  },
});

export const { removeUser, setUser, setWsConnected } = authSlice.actions;

export default authSlice.reducer;
