import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';


// const url = 'https://powerpay-africa-backend.onrender.com' //  process.env.NEXT_PUBLIC_BACKEND_URL
const url = process.env.NEXT_PUBLIC_BACKEND_URL


const initialState = {
    loading: false,
    error: '',
    success: false,
}

let errorMessage;

export const create = createAsyncThunk('createUpdateSlice/create', dataObj => {
    let dataUrl = dataObj.url
    delete dataObj.url
    
    return axios.post(`${url}/${dataUrl}`, dataObj).then(res => res.data)
})

export const update = createAsyncThunk('createUpdateSlice/update', dataObj => {
    let dataUrl = dataObj.url
    delete dataObj.url

    return axios.patch(`${url}/${dataUrl}`, dataObj).then(res => res.data)
})

export const deleteObj = createAsyncThunk('createUpdateSlice/deleteObj', dataObj => {
    let dataUrl = dataObj.url
    delete dataObj.url

    return axios.delete(`${url}/${dataUrl}`).then(res => res.data)
})

export const createUpdateSlice = createSlice({
    name: 'createUpdate',
    initialState,
    reducers: {
        cleanUp: state => {
            state.success = false;
            state.error = {}
        }
    },
    extraReducers: builder => {
        builder.addCase(create.pending, state => {
            state.loading = true
        })
        builder.addCase(create.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
            state.error = {}
        })
        builder.addCase(create.rejected, (state, action) => {
            state.loading = false
            state.success = false
            state.error = errorMessage
        })



        builder.addCase(update.pending, state => {
            state.loading = true
        })
        builder.addCase(update.fulfilled, (state) => {
            state.loading = false
            state.success = true
            state.error = {}
        })
        builder.addCase(update.rejected, (state) => {
            state.loading = false
            state.success = false
            state.error = errorMessage
        })

    }
})

export const { cleanUp } = createUpdateSlice.actions

export default createUpdateSlice.reducer