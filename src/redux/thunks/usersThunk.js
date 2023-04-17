import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const recievUsers = createAsyncThunk("recievUsers", async () => {
  const url = "http://localhost:3030/users";
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const recievNewsUsers = createAsyncThunk("recievNewsUsers", async () => {
  const url = "http://localhost:3030/newUsers";
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const upditeRating = createAsyncThunk("upditeRating", async (users) => {
  const url = `http://localhost:3030/users/${users.id}`;
  try {
    const { data } = await axios.put(url, users);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteUsers = createAsyncThunk("deleteUser", async (user) => {
  const url = `http://localhost:3030/users/${user.id}`;
  try {
    const { data } = await axios.delete(url);
    return { data, id: user.id };
  } catch (error) {
    throw new Error(error.message);
  }
});

export const postUsers = createAsyncThunk("postUsers", async (user) => {
  const url = "http://localhost:3030/users";
  try {
    const { data } = await axios.post(url, { ...user });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const recievBadUsers = createAsyncThunk("recievBadUsers", async () => {
  const url = "http://localhost:3030/badUsers";
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const recievGoodUsers = createAsyncThunk("recievGoodUsers", async () => {
  const url = "http://localhost:3030/goodUsers";
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addBadUsers = createAsyncThunk("addBadUsers", async (user) => {
  const url = "http://localhost:3030/badUsers";
  try {
    const { data } = await axios.post(url, { ...user });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const addGoodUsers = createAsyncThunk("addGoodUsers", async (user) => {
  const url = "http://localhost:3030/goodUsers";
  try {
    const { data } = await axios.post(url, { ...user });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateBadUsers = createAsyncThunk(
  "updateBadUsers",
  async (user) => {
    const url = `http://localhost:3030/badUsers/${user.id}`;
    try {
      const { data } = await axios.put(url, user);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const updateGoodUsers = createAsyncThunk(
  "updateGoodUsers",
  async (user) => {
    const url = `http://localhost:3030/goodUsers/${user.id}`;
    try {
      const { data } = await axios.put(url, user);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteBadUsers = createAsyncThunk(
  "deleteBadUsers",
  async (user) => {
    const url = `http://localhost:3030/badUsers/${user.id}`;
    try {
      const { data } = await axios.delete(url);
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteGoodUsers = createAsyncThunk(
  "deleteGoodUsers",
  async (user) => {
    const url = `http://localhost:3030/goodUsers/${user.id}`;
    try {
      const { data } = await axios.delete(url);
      return { data, id: user.id };
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

const updateBadUsersFulfilled = (state, { payload }) => {
  const index = state.badUsers.findIndex((user) => user.id === payload.id);
  state.badUsers[index].rating = payload.rating;
};

const updateGoodUsersFulfilled = (state, { payload }) => {
  const index = state.goodUsers.findIndex((user) => user.id === payload.id);
  state.goodUsers[index].rating = payload.rating;
};

const recievBadUsersFulfilled = (state, { payload }) => {
  state.badUsers = payload;
  console.log(payload, "payloadddd");
};

const recievGoodUsersFulfilled = (state, { payload }) => {
  state.goodUsers = payload;
  console.log(payload, "payloaddddaaaaaaaaaa");
};

const addBagUsersFulfilled = (state, { payload }) => {
  state.badUsers.push(payload);
};

const addGoodUsersFulfilled = (state, { payload }) => {
  state.goodUsers.push(payload);
};

const postUsersFulfilled = (state, { payload }) => {
  state.users.push(payload);
};

export const postUsersExtraRaducer = (builder) => {
  builder.addCase(postUsers.fulfilled, postUsersFulfilled);
};

export const addBadUsersExtrareducer = (builder) => {
  builder.addCase(addBadUsers.fulfilled, addBagUsersFulfilled);
};

export const addGoodUsersExtrareducer = (builder) => {
  builder.addCase(addGoodUsers.fulfilled, addGoodUsersFulfilled);
};

export const recievBadUsersExtrareducer = (builder) => {
  builder.addCase(recievBadUsers.fulfilled, recievBadUsersFulfilled);
};

export const recievGoodUsersExtrareducer = (builder) => {
  builder.addCase(recievGoodUsers.fulfilled, recievGoodUsersFulfilled);
};

export const updateBadUsersExtraRaducer = (builder) => {
  builder.addCase(updateBadUsers.fulfilled, updateBadUsersFulfilled);
};

export const updateGoodUsersExtraRaducer = (builder) => {
  builder.addCase(updateGoodUsers.fulfilled, updateGoodUsersFulfilled);
};

const recievUsersPending = (state, { payload }) => {
  state.users = [];
};

const recievUsersFulfilled = (state, { payload }) => {
  state.users = payload;
};

const recievUsersRejected = (state, { payload }) => {
  state.users = [];
};

export const recievUsersExtrareducer = (builder) => {
  builder
    .addCase(recievUsers.pending, recievUsersPending)
    .addCase(recievUsers.fulfilled, recievUsersFulfilled)
    .addCase(recievUsers.rejected, recievUsersRejected);
};

const UpdateFulfilled = (state, { payload }) => {
  const index = state.users.findIndex((user) => user.id === payload.id);
  state.users[index].rating = payload.rating;
  state.users[index].review = payload.review;
};

export const upditeRatingExtrareducer = (builder) => {
  builder.addCase(upditeRating.fulfilled, UpdateFulfilled);
};

const recievNewsUsersPending = (state, { payload }) => {
  state.newUsers = [];
};

const recievNewsUsersFulfilled = (state, { payload }) => {
  console.log("payload", payload);
  if (payload.length) {
    payload.map((user, index) => {
      console.log("user", user);
      user.id = new Date().getTime() + index + 2;
      return user;
    });
  }
  state.newUsers = payload;
};

const recievNewsUsersRejected = (state, { payload }) => {
  state.newUsers = [];
};

export const recievNewUsersExtrareducer = (builder) => {
  builder
    .addCase(recievNewsUsers.pending, recievNewsUsersPending)
    .addCase(recievNewsUsers.fulfilled, recievNewsUsersFulfilled)
    .addCase(recievNewsUsers.rejected, recievNewsUsersRejected);
};
