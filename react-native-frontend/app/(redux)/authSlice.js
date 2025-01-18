import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

//Function to get the user from storage
export const loadUserFromStorage = async () => {
    try {
        const userInfo = await AsyncStorage.getItem("userInfo");
        return userInfo ? JSON.parse(userInfo) : null;
    } catch (error) {
        return null
    }
}

//Initial State
const initialState = {
    user: null,
    isLoading: true,
};

//Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginUserAction:(state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            AsyncStorage.setItem("userInfo", JSON.stringify(action.payload))
        },
        logoutAction: (state, action) => {
            state.isLoading = false;
            state.user = null,
            AsyncStorage.removeItem("userInfo");
        },
        setUserAction:(state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        }
    }
});

export const {loginUserAction, logoutAction, setUserAction } = authSlice.actions;

export const authReducer = authSlice.reducer;

//Load userInfo

export const loadUser =  () => async (dispatch) => {
    const userInfo = await loadUserFromStorage();

    if(userInfo) {
        dispatch(setUserAction(userInfo))
    }
}
