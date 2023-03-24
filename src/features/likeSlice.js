import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    addLike: (state, action) => {
      const movieId = action.payload;

      const existItem = state.find((id) => id === movieId);

      if (existItem) {
        return;
      } else {
        state.push(movieId);
      }
    },
    removeLike: (state, action) => {
      // need to be tested
      const movieId = action.payload;
      state = state.filter((id) => id !== movieId);
      return state;
    },
  },
});

export const { addLike, removeLike } = likeSlice.actions;

export const selectLike = (state) => state.like;

export default likeSlice.reducer;
