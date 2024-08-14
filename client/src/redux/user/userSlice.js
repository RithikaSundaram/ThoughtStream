import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentUser: null,
	error: null,
	loading: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		signInStart: state => {
			state.loading = true;
			state.error = null;
		},
		signInSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = null;
		},
		signInFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			console.error("Sign-in error:", action.payload); // Log error details
		},
		updateStart: state => {
			state.loading = true;
			state.error = null;
		},
		updateSuccess: (state, action) => {
			state.currentUser = action.payload;
			state.loading = false;
			state.error = null;
		},
		updateFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			console.error("Update error:", action.payload); // Log error details
		},
		deleteUserStart: state => {
			state.loading = true;
			state.error = null;
		},
		deleteUserSuccess: state => {
			state.currentUser = null;
			state.loading = false;
			state.error = null;
		},
		deleteUserFailure: (state, action) => {
			state.loading = false;
			state.error = action.payload;
			console.error("Delete user error:", action.payload); // Log error details
		},
		signoutSuccess: state => {
			state.currentUser = null;
			state.error = null;
			state.loading = false;
		},
	},
});

export const {
	signInStart,
	signInSuccess,
	signInFailure,
	signoutSuccess,
	updateStart,
	updateFailure,
	updateSuccess,
	deleteUserFailure,
	deleteUserStart,
	deleteUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
