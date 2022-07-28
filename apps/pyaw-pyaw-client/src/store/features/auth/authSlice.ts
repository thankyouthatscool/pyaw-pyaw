import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  username: string;
}

export interface AuthState {
  availableUsers: User[];
  user: User | null;
  wsConnected: boolean;
}

const initialState: AuthState = {
  availableUsers: [
    { username: "trevor", id: "0" },
    { username: "zach", id: "1" },
    { username: "sam", id: "2" },
    { username: "timmy", id: "3" },
    { username: "darren", id: "4" },
    { username: "sasha", id: "5" },
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
