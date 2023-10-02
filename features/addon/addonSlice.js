import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// const url = 'https://powerpay-africa-backend.onrender.com' //  process.env.NEXT_PUBLIC_BACKEND_URL
const url = process.env.NEXT_PUBLIC_BACKEND_URL


const initialState = {
	loading: false,
	brands: [],
	error: '',
	shippingLocation: '',
	shippingPrice: null,
	months: null,
	sideBarOpen: false,
	loaners: [],
};

export const confirmPayment = createAsyncThunk('addon/confirmPayment', (order_id) => {
	return axios.get(`${url}/transactions?order_id=${order_id}`).then((res) => res.data);
})

export const fetchLoaners = createAsyncThunk('addon/fetchLoaners', () => {
	return axios.get(`${url}/loaners`).then((res) => res.data);
});


const addonSlice = createSlice({
	name: 'addon',
	initialState,
	reducers: {
		reset: (state) => {
			state.brands = []
		},
		handleShipping: (state, action) => {
			state.shippingLocation = action.payload.shipTo
			state.shippingPrice = action.payload.shipPrice
		},
		handleMonths: (state, action) => {
			state.months = action.payload
		},
		handleToggleSidebar: (state) => {
			state.sideBarOpen = !state.sideBarOpen
		},
	},
	extraReducers: (builder) => {
		builder
        .addCase(confirmPayment.pending, (state) => {
			state.loading = true;
		})

		.addCase(confirmPayment.fulfilled, (state, action) => {
			state.loading = false;
			state.error = '';
		})

		.addCase(confirmPayment.rejected, (state) => {
			state.loading = false;
			state.error = 'An error accured!';
		})

		.addCase(fetchLoaners.pending, (state) => {
			state.loading = true;
		})

		.addCase(fetchLoaners.fulfilled, (state, action) => {
			state.loading = false;
			state.error = '';
			if (action?.payload?.results?.length) {
				state.loaners = action?.payload?.results
			}else{
				state.loaners = []
			}
		})
		.addCase(fetchLoaners.rejected, (state) => {
			state.loading = false;
			state.error = 'An error accured!';
		})
	},
});

export default addonSlice.reducer;

export const {
	reset,
	handleShipping,
	handleMonths,
	handleToggleSidebar,
} = addonSlice.actions;
