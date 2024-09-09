import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminData: null,
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminDetails: (state, action) => {
      state.adminData = action.payload.admin;
    },
  },
});

export const { setAdminDetails } = adminSlice.actions;

export default adminSlice.reducer;
