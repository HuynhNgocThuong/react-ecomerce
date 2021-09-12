import { createAsyncThunk } from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import StorageKeys from 'constants/storage-keys';
const { createSlice } = require('@reduxjs/toolkit');
export const register = createAsyncThunk('user/register', async (payload) => {
        // Call Api to register
        const data = await userApi.register(payload);
        console.log('Data: ', data);
        //Save data to local storeage
        localStorage.setItem(StorageKeys.TOKEN, data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

        //Return user data
        return data.user;
    }
  );
  export const login = createAsyncThunk('user/login', async (payload) => {
    // Call Api to register
    const data = await userApi.login(payload);
    console.log('Data: ', data);
    //Save data to local storeage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt);
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

    //Return user data
    return data.user;
}
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        settings:{},
    },
    reducers:{
        logSate(state){
            console.log(state);
        },
        logout(state){
          // Remove local storage
          localStorage.removeItem(StorageKeys.USER);
          localStorage.removeItem(StorageKeys.TOKEN);
          // Remove current state
          state.current = {};
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder
        .addCase(register.fulfilled, (state, action) => {
          // Add user to the state array
          console.log('Action payload: ', action.payload)
          state.current = action.payload;
        })
        .addCase(login.fulfilled, (state, action) => {
          // Add user to the state array
          state.current = action.payload;
        })
      },
    // extraReducers:{
    //     [register.fulfilled]: (state, action)=> {
    //         state.current = action.payload;
    //     },
    // }

});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
