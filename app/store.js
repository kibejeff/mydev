import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from '~/features/user/userSlice'
import createUpdateReducer from '~/features/user/createUpdateSlice'
import productReducer from '~/features/products/productSlice'
import addonReducer from '~/features/addon/addonSlice'
import vendorReducer from '~/features/vendor/vendorSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  user: userReducer,
  createUpdate: createUpdateReducer,
  products: productReducer,
  addon: addonReducer,
  vendor: vendorReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)