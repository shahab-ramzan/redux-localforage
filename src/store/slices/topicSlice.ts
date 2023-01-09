import { createSlice } from "@reduxjs/toolkit";

export const topicSlice = createSlice({
  name: "topic",
  initialState: {
   data:''
  },
  reducers: {
    setDummyData: (state, action) => {
      state.data=action.payload
    },
  
  },
});

export const { setDummyData,  } = topicSlice.actions;

export default topicSlice.reducer;
