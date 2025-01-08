import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    order: null
}

const orderSlice = createSlice({
    name: 'orderReducer',
    initialState,
    reducers: {
        addOrders: (state, action)=>{
            state.order = action.payload
        }
    }
})

export const {addOrders} = orderSlice.actions

export default orderSlice.reducer