import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IUser = {
  id: '',
  email: '',
  username: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (
      state: typeof initialState,
      action: PayloadAction<typeof initialState>,
    ) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions;

export const { reducer: userReducer } = userSlice;
