import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nguoiDungService } from "../services/nguoiDung.service";

export const getValueUserApi = createAsyncThunk(
  "nguoiDung/getValueUserApi",
  async (_) => {
    const result = await nguoiDungService.getAllUser();
    console.log(result);
    return result.data.content;
  }
);
const initialState = {
  listUser: [],
};

const nguoiDungSlice = createSlice({
  name: "nguoiDung",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getValueUserApi.fulfilled, (state, action) => {
      console.log(action);
      state.listUser = action.payload;
    });
    builder.addCase(getValueUserApi.pending, (state, action) => {
      console.log("tôi đang chờ xử lí");
    });
    builder.addCase(getValueUserApi.rejected, (state, action) => {
      console.log("tôi bị lỗi ");
    });
  },
});

export const {} = nguoiDungSlice.actions;

export default nguoiDungSlice.reducer;
