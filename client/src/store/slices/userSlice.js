import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      const { token, decodedToken } = action.payload;
      state.user = decodedToken || action.payload;
      localStorage.setItem("userToken", token);
    },
    removeUser: (state) => {
      localStorage.removeItem("userToken");
      state.user = null;
    },
  },
});

export const { saveUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
