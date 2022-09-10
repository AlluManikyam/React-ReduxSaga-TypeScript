import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { CommonState } from "./types";
export const initialState: CommonState = {
  networkCall: {
    loading: false,
    hasMoreData: true,
    error: null,
  },
};
const commonSlice = createSlice({
  name: "Common",
  initialState,
  reducers: {
    setNetworkCallRequestConfig(
      state,
      action: PayloadAction<CommonState["networkCall"]>
    ) {
      console.log("networkCall:::::::::", state);

      state.networkCall = {
        ...state.networkCall,
        ...action.payload,
      };
    },
    setNetworkCallResponseConfig(
      state,
      action: PayloadAction<CommonState["networkCall"]>
    ) {
      state.networkCall = {
        ...state.networkCall,
        ...action.payload,
      };
    },
  },
});
export const { actions, reducer, name: sliceKey } = commonSlice;
