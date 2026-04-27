import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type UserState = {
  id: number;
  name: string;
  email: string;
  profileImage: string;
};

type CommonState = {
  authToken: string | null;
  user: UserState | null;
  favouriteEventIds: number[];
  hasHydratedFavourites: boolean;
};

const initialState: CommonState = {
  authToken: null,
  user: null,
  favouriteEventIds: [],
  hasHydratedFavourites: false,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setAuthToken: (state, action: PayloadAction<string | null>) => {
      state.authToken = action.payload;
    },
    setUser: (state, action: PayloadAction<UserState | null>) => {
      state.user = action.payload;
    },
    hydrateFavouriteEventIds: (state, action: PayloadAction<number[]>) => {
      if (state.hasHydratedFavourites) {
        return;
      }
      state.favouriteEventIds = Array.from(new Set(action.payload));
      state.hasHydratedFavourites = true;
    },
    toggleFavouriteEventId: (state, action: PayloadAction<number>) => {
      const eventDateId = action.payload;
      const existingIndex = state.favouriteEventIds.indexOf(eventDateId);
      if (existingIndex >= 0) {
        state.favouriteEventIds.splice(existingIndex, 1);
      } else {
        state.favouriteEventIds.push(eventDateId);
      }
      state.hasHydratedFavourites = true;
    },
    logoutUser: state => {
      state.authToken = null;
      state.user = null;
    },
  },
});

export const {
  setAuthToken,
  setUser,
  hydrateFavouriteEventIds,
  toggleFavouriteEventId,
  logoutUser,
} = commonSlice.actions;
export default commonSlice.reducer;
