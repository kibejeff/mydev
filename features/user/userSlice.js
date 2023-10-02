import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// const url = 'https://powerpay-africa-backend.onrender.com' //  process.env.NEXT_PUBLIC_BACKEND_URL
const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const initialState = {
	loading: false,
	isLoggedIn: false,
	user: {},
	phoneNumber: '',
	userPk: null,
    buyer: {},
};

export const loginUser = createAsyncThunk('userSlice/loginUser', (data) => {
	return axios.post(`${url}/login/`, data).then((res) => res.data);
});

export const checkUser = createAsyncThunk('userSlice/checkUser', (data) => {
	return axios.post(`${url}/users/check_user/`, data).then((res) => res.data);
});

export const registerUser = createAsyncThunk(
	'userSlice/registerUser',
	(data) => {
		return axios.post(`${url}/users/`, data).then((res) => res.data);
	},
);

export const sendOtp = createAsyncThunk('userSlice/sendOtp', (data) => {
	return axios.post(`${url}/users/send_otp/`, data).then((res) => res.data);
});

export const verifyOtp = createAsyncThunk('userSlice/verifyOtp', (data) => {
	return axios.post(`${url}/users/verify_otp/`, data).then((res) => res.data);
});

export const getBuyer = createAsyncThunk('userSlice/getBuyer', (data) => {
	return axios.get(`${url}/users/${data.user_id}/`).then((res) => res.data);
});

export const getBuyerProfile = createAsyncThunk('userSlice/getBuyerProfile', (data) => {
	return axios.get(`${url}/buyers?buyer_id=${data.user_id}`).then((res) => res.data);
});

export const sendPassOtp = createAsyncThunk('userSlice/sendPassOtp', (data) => {
	return axios
		.post(`${url}/users/send_password_otp/`, data)
		.then((res) => res.data);
});

export const verifyPassOtp = createAsyncThunk(
	'userSlice/verifyPassOtp',
	(data) => {
		return axios
			.post(`${url}/users/verify_password_otp/`, data)
			.then((res) => res.data);
	},
);

export const sendNewAccountAlert = createAsyncThunk(
	'userSlice/sendNewAccountAlert',
	(data) => {
		return axios
			.post(`${url}/users/send_new_account_notification/`, data)
			.then((res) => res.data);
	},
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		customPhone: (state, action) => {
			state.phoneNumber = action.payload;
		},
		customUserPk: (state, action) => {
			state.userPk = action.payload;
		},
		resetPassValues: (state) => {
			state.userPk = null;
		},
		logout: (state) => {
			state.user = {};
			state.isLoggedIn = false;
			state.phoneNumber = '';
		},
	},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.loading = false;
			if (action?.payload?.id) {
				state.registerError = {};
				state.phoneNumber = action.payload.phone;
				toast.success('Account successfully created!');
			} else {
				state.registerError = {};
				state.phoneNumber = '';
				toast.error('Error! Could not create account. Email or phone exists!');
			}
		});

		builder.addCase(registerUser.rejected, (state, action) => {
			state.loading = false;
			state.registerError = {};
			state.phoneNumber = '';
			toast.error('Error! Could not create account. Email or phone exists!');
		});

		builder.addCase(loginUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.loading = false;
			if (action?.payload?.success) {
				state.isLoggedIn = true;
				state.phoneNumber = action?.payload?.phone;
				state.user = action?.payload;
				toast.success('Login Successfull!');
			} else {
				state.user = {};
				state.isLoggedIn = false;
				state.phoneNumber = '';
				toast.error('Invalid credentials!');
			}
		});

		builder.addCase(loginUser.rejected, (state, action) => {
			state.loading = false;
			state.isLoggedIn = false;
			state.phoneNumber = '';
			state.user = {};
			toast.error('Invalid credentials!');
		});

		builder.addCase(checkUser.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(checkUser.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(checkUser.rejected, (state, action) => {
			state.loading = false;
		});

		builder.addCase(sendOtp.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(sendOtp.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(sendOtp.rejected, (state, action) => {
			state.loading = false;
		});

		builder.addCase(verifyOtp.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(verifyOtp.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(verifyOtp.rejected, (state, action) => {
			state.loading = false;
		});

		builder.addCase(getBuyer.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getBuyer.fulfilled, (state, action) => {
			state.loading = false;
			if (action?.payload?.id) {
				state.user = action.payload;
			} else {
				state.user = {}
			}
		});

		builder.addCase(getBuyer.rejected, (state, action) => {
			state.loading = false;
		});

        builder.addCase(getBuyerProfile.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(getBuyerProfile.fulfilled, (state, action) => {
			state.loading = false;
			if (action?.payload?.results?.length) {
				state.buyer = action?.payload?.results[0];
			} else {
				state.buyer = {}
			}
		});

		builder.addCase(getBuyerProfile.rejected, (state, action) => {
			state.loading = false;
		});

		builder.addCase(sendPassOtp.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(sendPassOtp.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(sendPassOtp.rejected, (state, action) => {
			state.loading = false;
		});

		builder.addCase(verifyPassOtp.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(verifyPassOtp.fulfilled, (state, action) => {
			state.loading = false;
		});

		builder.addCase(verifyPassOtp.rejected, (state, action) => {
			state.loading = false;
		});

		builder.addCase(sendNewAccountAlert.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(sendNewAccountAlert.fulfilled, (state) => {
			state.loading = false;
		});

		builder.addCase(sendNewAccountAlert.rejected, (state) => {
			state.loading = false;
		});
	},
});

export const {
	customPhone,
	logout,
	customUserPk,
	resetPassValues,
} = userSlice.actions;

export default userSlice.reducer;
