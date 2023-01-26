import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../config/configStore';

interface userState {
  userNickname: string;
  currentPwd: string;
  newPwd: string;
  confirmNewPwd: string;
}

const initialState: userState = {
  userNickname: 'Visitor',
  currentPwd: '',
  newPwd: '',
  confirmNewPwd: '',
};

const userSlice: any = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getCurrentPwd: (state, action: PayloadAction<string>) => {
      state.currentPwd = action.payload;
    },
    createNewPwd: (state, action: PayloadAction<string>) => {
      state.newPwd = action.payload;
    },
    getConfirmPwd: (state, action: PayloadAction<string>) => {
      state.confirmNewPwd = action.payload;
    },
    updateUserNickname: (state, action: PayloadAction<string>) => {
      state.userNickname = action.payload;
    },
  },
});

export const {
  getCurrentPwd,
  createNewPwd,
  getConfirmPwd,
  updateUserNickname,
} = userSlice.actions;
export default userSlice.reducer;
