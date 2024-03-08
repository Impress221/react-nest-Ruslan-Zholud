import { createSlice } from '@reduxjs/toolkit'

export interface Form {
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
  userId: string;
}

const initialState: Form = {
  username: '',
  phone: '',
  password: '',
  confirmPassword: '',
  userId: ''
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData(state, action) {
      return { ...state, ...action.payload };
    },
    setUserId(state, action) {
      state.userId = action.payload;
    }
  },
});

export const {
  setFormData,
  setUserId
} = formSlice.actions;

export default formSlice.reducer;
