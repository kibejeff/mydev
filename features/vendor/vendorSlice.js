import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// const url = 'https://powerpay-africa-backend.onrender.com' //  process.env.NEXT_PUBLIC_BACKEND_URL
const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const initialState = {
	loading: false,
	deleting: false,
	vendorProducts: [],
	vendor: {},
	myProducts: [],
	error: '',
	editedProducts: {},
	customerInfo: {},
	pendingLoans: [],
	pendingDepositLoans: [],
	activeLoans: [],
	customerId: null,
	inventory: [],
	activeInventory: {},
	vendorAgents: [],
};

// export const fetchMyProducts = createAsyncThunk(
// 	'vendorSlice/fetchMyProducts',
// 	(vendor_id) => {
// 		return axios
// 			.get(`${url}/products?vendor_id=${vendor_id}`)
// 			.then((res) => res.data);
// 	},
// )

export const deleteProduct = createAsyncThunk(
	'vendorSlice/deleteProduct',
	(data) => {
		return axios.delete(`${url}/products/${data}/`).then((res) => res.data);
	},
);

export const getBuyerProfile = createAsyncThunk(
	'vendorSlice/getBuyerProfile',
	(data) => {
		return axios.get(`${url}/buyers/${data}/`).then((res) => res.data);
	},
);

export const getVendorProfile = createAsyncThunk(
	'vendorSlice/getVendorProfile',
	(data) => {
		return axios
			.get(`${url}/vendors?vendor_id=${data}`)
			.then((res) => res.data);
	},
);

export const getVendorInventories = createAsyncThunk(
	'vendorSlice/getVendorInventories',
	(data) => {
		return axios
			.get(`${url}/inventories?vendor_id=${data}`)
			.then((res) => res.data);
	},
);

export const getVendorAgents = createAsyncThunk(
	'vendorSlice/getVendorAgents',
	(data) => {
		return axios.get(`${url}/users?vendor_id=${data}`).then((res) => res.data);
	},
);

export const getVendorPendingLoans = createAsyncThunk(
	'vendorSlice/getVendorPendingLoans',
	(data) => {
		return axios
			.get(`${url}/orders?vendor_id=${data}&pending=true`)
			.then((res) => res.data);
	},
);

export const getVendorActiveLoans = createAsyncThunk(
	'vendorSlice/getVendorActiveLoans',
	(data) => {
		return axios
			.get(`${url}/orders?vendor_id=${data}&active=true`)
			.then((res) => res.data);
	},
);

export const getVendorPendingDepositLoans = createAsyncThunk(
	'vendorSlice/getVendorPendingDepositLoans',
	(data) => {
		return axios
			.get(`${url}/orders?vendor_id=${data}&pending=true&deposit=false`)
			.then((res) => res.data);
	},
);

const vendorSlice = createSlice({
	name: 'vendor',
	initialState,
	reducers: {
		reset: (state) => {
			state.vendorProducts = [];
		},

		handleEditProduct: (state, action) => {
			state.editedProducts = action.payload;
		},
		setBuyerId: (state, action) => {
			state.customerId = action.payload;
		},
		setActiveInventory: (state, action) => {
			state.activeInventory = action.payload;
		},
		clearActiveInventory: (state) => {
			state.activeInventory = {};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getBuyerProfile.pending, (state) => {
				state.loading = true;
			})

			.addCase(getBuyerProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.customerInfo = action?.payload;
				state.error = '';
			})

			.addCase(getBuyerProfile.rejected, (state) => {
				state.loading = false;
				state.customerInfo = {};
				state.error = 'An error accured!';
			})

			.addCase(deleteProduct.pending, (state) => {
				state.deleting = true;
			})

			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.deleting = false;
			})

			.addCase(deleteProduct.rejected, (state) => {
				state.deleting = false;
				state.error = 'An error accured!';
			})

			.addCase(getVendorProfile.pending, (state) => {
				state.loading = true;
			})
			.addCase(getVendorProfile.fulfilled, (state, action) => {
				state.loading = false;
				if (action?.payload?.results?.length) {
					state.vendor = action?.payload?.results[0];
				} else {
					state.vendor = {};
				}
			})

			.addCase(getVendorProfile.rejected, (state, action) => {
				state.loading = false;
			})

			.addCase(getVendorInventories.pending, (state) => {
				state.loading = true;
			})
			.addCase(getVendorInventories.fulfilled, (state, action) => {
				state.loading = false;
				if (action?.payload?.results?.length) {
					state.inventory = action?.payload?.results;
				} else {
					state.inventory = [];
				}
			})

			.addCase(getVendorInventories.rejected, (state, action) => {
				state.loading = false;
			})

			.addCase(getVendorAgents.pending, (state) => {
				state.loading = true;
			})
			.addCase(getVendorAgents.fulfilled, (state, action) => {
				state.loading = false;
				if (action?.payload?.results?.length) {
					state.vendorAgents = action?.payload?.results;
				} else {
					state.vendorAgents = [];
				}
			})

			.addCase(getVendorAgents.rejected, (state, action) => {
				state.loading = false;
			})

			.addCase(getVendorPendingLoans.pending, (state) => {
				state.loading = true;
			})
			.addCase(getVendorPendingLoans.fulfilled, (state, action) => {
				state.loading = false;
				if (action?.payload?.results?.length) {
					state.pendingLoans = action?.payload?.results;
				} else {
					state.pendingLoans = [];
				}
			})

			.addCase(getVendorPendingLoans.rejected, (state, action) => {
				state.loading = false;
			})

			.addCase(getVendorActiveLoans.pending, (state) => {
				state.loading = true;
			})
			.addCase(getVendorActiveLoans.fulfilled, (state, action) => {
				state.loading = false;
				if (action?.payload?.results?.length) {
					state.activeLoans = action?.payload?.results;
				} else {
					state.activeLoans = [];
				}
			})

			.addCase(getVendorActiveLoans.rejected, (state, action) => {
				state.loading = false;
			})

			.addCase(getVendorPendingDepositLoans.pending, (state) => {
				state.loading = true;
			})
			.addCase(getVendorPendingDepositLoans.fulfilled, (state, action) => {
				state.loading = false;
				if (action?.payload?.results?.length) {
					state.pendingDepositLoans = action?.payload?.results;
				} else {
					state.pendingDepositLoans = [];
				}
			})

			.addCase(getVendorPendingDepositLoans.rejected, (state, action) => {
				state.loading = false;
			});
	},
});

export default vendorSlice.reducer;

export const {
	reset,
	handleEditProduct,
	setBuyerId,
	setActiveInventory,
	clearActiveInventory,
} = vendorSlice.actions;
