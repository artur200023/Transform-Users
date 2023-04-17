import { createSlice } from "@reduxjs/toolkit";
import {
  addBadUsers,
  addBadUsersExtrareducer,
  addGoodUsers,
  addGoodUsersExtrareducer,
  recievNewUsersExtrareducer,
  deleteUsers,
  recievBadUsersExtrareducer,
  recievGoodUsersExtrareducer,
  recievUsersExtrareducer,
  updateBadUsersExtraRaducer,
  updateGoodUsersExtraRaducer,
  upditeRating,
  upditeRatingExtrareducer,
  postUsersExtraRaducer,
} from "../../thunks/usersThunk";
export const usersSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    newUsers: [],
    badUsers: [],
    goodUsers: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    recievUsersExtrareducer(builder);
    upditeRating(builder);
    upditeRatingExtrareducer(builder);
    deleteUsers(builder);
    recievBadUsersExtrareducer(builder);
    recievGoodUsersExtrareducer(builder);
    addBadUsers(builder);
    addGoodUsers(builder);
    addBadUsersExtrareducer(builder);
    addGoodUsersExtrareducer(builder);
    updateBadUsersExtraRaducer(builder);
    updateGoodUsersExtraRaducer(builder);
    recievNewUsersExtrareducer(builder);
    postUsersExtraRaducer(builder);
  },
});

export const selectUsers = (state) => state.user.users;

export const selectnewUsers = (state) => state.user.newUsers;

export const selectBadUsers = (state) => state.user.badUsers;

export const selectGoodUsers = (state) => state.user.goodUsers;

export const {} = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
