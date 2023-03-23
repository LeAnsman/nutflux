import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import likeReducer from "../features/likeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    like: likeReducer,
  },
});
