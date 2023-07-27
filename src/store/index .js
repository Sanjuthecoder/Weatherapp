import { configureStore } from "@reduxjs/toolkit";
import createdata from "./data";
const store = configureStore({
  reducer: {
    data: createdata.reducer,
  },
});
export default store;