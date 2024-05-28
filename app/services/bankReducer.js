import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  category: "",
  name: "",
  quantity: "",
  unit: "",
  image: "",
  description: "",
};

const bankSlice = createSlice({
  name: "bank",
  initialState,
  reducers: {
    getFoodBank(state, action) {
        state.loading = true;
        state.name = action.payload.name;
        state.category = action.payload.category;
        state.quantity = action.payload.quantity;
    }
  },
});
