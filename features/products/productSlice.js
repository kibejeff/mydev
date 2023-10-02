import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// const url = 'https://powerpay-africa-backend.onrender.com' //  process.env.NEXT_PUBLIC_BACKEND_URL
const url = process.env.NEXT_PUBLIC_BACKEND_URL

let cartItems;
let total;

const ISSERVER = typeof window === 'undefined';

if (!ISSERVER) {
	cartItems = JSON.parse(localStorage.getItem('cart')) || [];
	total = localStorage.getItem('total') || 0;
}

const manipulateCart = (item) => {
	localStorage.setItem('cart', JSON.stringify(item));
};

const initialState = {
	loading: false,
	products: [],
	singleProduct: {},
	error: '',
	cart: cartItems,
	totalPrice: total,
	compareList: [],
	wishList: [],
	categories: [],
	brands: [],
	productImages: [],
	singleProductImages: [],
	userCheckouts: [],
	productToPay: {},
	mpesaInitiateSuccess: null,
	mpesaInitiateObj: {},
	orderNumber: "",
	transactionInvoices: [],
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', () => {
	return axios.get(`${url}/products/`).then((res) => res.data);
});

export const addProduct = createAsyncThunk('products/addProduct', (data) => {
	return axios.post(`${url}/products/`, data).then((res) => res.data);
});

export const fetchProductById = createAsyncThunk(
	'products/fetchProductById',
	(id) => {
		return axios.get(`${url}/products/${id}/`).then((res) => res.data);
	},
);

export const fetchCategories = createAsyncThunk('products/fetchCategories', () => {
	return axios.get(`${url}/categories/`).then((res) => res.data);
});

export const fetchBrands = createAsyncThunk('products/fetchBrands', () => {
	return axios.get(`${url}/brands/`).then((res) => res.data);
});

export const fetchProductImages = createAsyncThunk('products/fetchProductImages', (data) => {
	return axios.get(`${url}/product-images?product_id=${data?.product_id}`).then((res) => res.data);
});

export const sendCheckoutEmail = createAsyncThunk('products/sendCheckoutEmail', (data) => {
	return axios.post(`${url}/orders/checkout_email/`, data).then((res) => res.data);
});

export const getUserCheckouts = createAsyncThunk('products/getUserCheckouts', (data) => {
	return axios.get(`${url}/orders/?buyer_id=${data}`).then((res) => res.data);	
});

export const initiateMpesa = createAsyncThunk('products/initiateMpesa', (data) => {
	return axios.post(`${url}/transactions/mpesa_stk_push/`, data).then((res) => res.data);
});

export const getUserInvouces = createAsyncThunk('products/getUserInvouces', (data) => {
	return axios.get(`${url}/transactions?buyer_id=${data}`).then((res) => res.data);
});


const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			if (state.cart.find((item) => action.payload.id === item.id))
				return toast.info('Item already selected. Please proceed to checkout', {
					position: 'bottom-left',
					autoClose: 5000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'colored',
				});
			let newCartItem = {
				...action.payload,
				quantity: 1,
				subtotal: action.payload.price,
			};
			state.cart = [newCartItem];
			// state.cart.slice(-1)
            toast.success('Product ready for checkout', {
                position: 'bottom-left',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: 'colored',
            });
			manipulateCart(state.cart);

			return state;
		},

		removeFromCart: (state, action) => {
			state.cart = state.cart.filter((item) => item.id !== action.payload);
			manipulateCart(state.cart);
            
            toast.info('Item removed from cart', {
                position: 'bottom-left',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: 'colored',
            });

			return state;
		},

		incrementItem: (state, action) => {
			let index = state.cart.findIndex((item) => item.id === action.payload);
			state.cart[index].quantity += 1;
			state.cart[index].subtotal += state.cart[index].price;
			manipulateCart(state.cart);
		},

		decrementItem: (state, action) => {
			let index = state.cart.findIndex((item) => item.id === action.payload);
			if (state.cart[index].quantity === 1) return state;
			state.cart[index].quantity -= 1;
			state.cart[index].subtotal -= state.cart[index].price;
			manipulateCart(state.cart);
		},

		getTotal: (state) => {
			state.totalPrice = state.cart.reduce((acc, item) => {
				let average = acc + item.price * item.quantity;
				//   setTotalToCart(average)
				localStorage.setItem('total', JSON.stringify(average));
				return average;
			}, 0);
		},

		emptyCart: (state) => {
			state.cart = [];
			state.totalPrice = 0;
		},

		customSingleProduct: (state, action) => {
			state.singleProduct = action.payload;
		},

		addToCompare: (state, action) => {
			if (state.compareList?.find((item) => action.payload.id === item.id)){
				toast.info('Item already selected.', {
					position: 'bottom-left',
					autoClose: 5000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'colored',
				});
			}	
			else{
				state.compareList?.push(action.payload);
				if (state.compareList?.length > 4) {
					state.compareList?.shift()
				}
				toast.success('Product added to compare list', {
					position: 'bottom-left',
					autoClose: 5000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'colored',
				});
			}

		},

		removeFromCompare: (state, action) => {
			state.compareList = state.compareList.filter((item) => item.id !== action.payload);
            
            toast.info('Item removed from compare list', {
                position: 'bottom-left',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: 'colored',
            });
		},

		addToWishlist: (state, action) => {
			if (state.wishList?.find((item) => action.payload.id === item.id)){
				toast.info('Product already in your wishlist.', {
					position: 'bottom-left',
					autoClose: 5000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'colored',
				});
			}	
			else{
				state.wishList?.push(action.payload);
				toast.success('Product added to wishlist', {
					position: 'bottom-left',
					autoClose: 5000,
					hideProgressBar: true,
					closeOnClick: true,
					pauseOnHover: false,
					draggable: false,
					progress: undefined,
					theme: 'colored',
				});
			}

		},

		removeFromWishlist: (state, action) => {
			state.wishList = state.wishList.filter((item) => item.id !== action.payload);
            
            toast.info('Item removed from wishlist', {
                position: 'bottom-left',
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: 'colored',
            });
		},

		addItemToPay: (state, action) => {
			state.productToPay = action.payload
		},
		removeItemToPay: state => {
			state.productToPay = {}
		},
		getOrderNumber: (state, action) => {
			state.orderNumber = action.payload
		},
		changeMpesaSuccess: (state) => {
			state.mpesaInitiateSuccess = true
		},
		resetMpesaSuccess: (state) => {
			state.mpesaInitiateSuccess = false
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.pending, (state) => {
			state.loading = true;
		})

		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.loading = false;
			state.products = action.payload.results;
			state.error = '';
		})

		builder.addCase(fetchProducts.rejected, (state) => {
			state.loading = false;
			state.products = [];
		})

		builder.addCase(fetchProductById.fulfilled, (state, action) => {
			state.singleProduct = action.payload;
		})

		builder.addCase(addProduct.pending, (state) => {
			state.loading = true;
		})

		builder.addCase(addProduct.fulfilled, (state, action) => {
			state.loading = false;
			state.products.push(action.payload);
			state.error = '';
		});

		builder.addCase(addProduct.rejected, (state, action) => {
			state.loading = false;
			state.error = 'An error accured!';
		});



		builder.addCase(fetchCategories.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			state.loading = false;
			state.categories = action.payload.results
			state.error = '';
		});

		builder.addCase(fetchCategories.rejected, (state, action) => {
			state.loading = false;
			state.error = 'An error accured!';
		});



		builder.addCase(fetchBrands.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(fetchBrands.fulfilled, (state, action) => {
			state.loading = false;
			state.brands = action.payload.results
			state.error = '';
		});

		builder.addCase(fetchBrands.rejected, (state, action) => {
			state.loading = false;
			state.error = 'An error accured!';
		});


		builder.addCase(fetchProductImages.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(fetchProductImages.fulfilled, (state, action) => {
			state.loading = false;
			if (action?.payload?.count === 0) {
				state.productImages = []
			}else{
				let imgArr = []
				action.payload.results?.forEach(item => {
					imgArr.push(item?.images_url)
				})
				state.productImages = imgArr
			}
			state.error = '';
		});

		builder.addCase(fetchProductImages.rejected, (state, action) => {
			state.loading = false;
			state.error = 'An error accured!';
		});


		builder.addCase(sendCheckoutEmail.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(sendCheckoutEmail.fulfilled, (state, action) => {
			state.loading = false;
			state.error = '';
		});

		builder.addCase(sendCheckoutEmail.rejected, (state, action) => {
			state.loading = false;
			state.error = 'An error accured!';
		});


		builder.addCase(getUserCheckouts.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(getUserCheckouts.fulfilled, (state, action) => {
			state.loading = false;
			if (action?.payload?.results?.length) {
				state.userCheckouts = action?.payload?.results
			}else{
				state.userCheckouts = []
			}
			state.error = '';
		});

		builder.addCase(getUserCheckouts.rejected, (state, action) => {
			state.loading = false;
			state.error = 'An error accured!';
		});


		builder.addCase(initiateMpesa.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(initiateMpesa.fulfilled, (state, action) => {
			state.loading = false;
			state.mpesaInitiateSuccess = true;
			state.error = '';
		});

		builder.addCase(initiateMpesa.rejected, (state, action) => {
			state.loading = false;
			state.mpesaInitiateSuccess = false
			state.error = 'An error accured!';
		});


		builder.addCase(getUserInvouces.pending, (state) => {
			state.loading = true;
		});

		builder.addCase(getUserInvouces.fulfilled, (state, action) => {
			state.loading = false;
			state.error = '';
			state.transactionInvoices = action?.payload?.results
		});

		builder.addCase(getUserInvouces.rejected, (state) => {
			state.loading = false;
			state.error = 'An error accured!';
		});


		
	},
});

export default productSlice.reducer;

export const {
	addToWishlist,
	removeFromWishlist,
	addToCompare,
	removeFromCompare,
	addToCart,
	removeFromCart,
	incrementItem,
	decrementItem,
	getTotal,
	emptyCart,
	customSingleProduct,
	addItemToPay,
	removeItemToPay,
	getOrderNumber,
	resetMpesaSuccess,
	changeMpesaSuccess,
} = productSlice.actions;
