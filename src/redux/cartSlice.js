import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
    addToCartApi,
    updateCartQuantityApi,
    removeFromCartApi,
    placeOrderApi,
    fetchCartItemsApi
} from "../api"

// Async thunk actions for API requests
export const fetchCartItems = createAsyncThunk(
    "cartItems/fetchCartItems",
    async () => {
        try {
            const response = await fetchCartItemsApi()
            return response.data
        } catch (e) {
            throw new Error(e.message)
        }
    }
)

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (product, { rejectWithValue }) => {
        try {
            const response = await addToCartApi(product)
            return response.data
        } catch (error) {
            return rejectWithValue(
                error.response?.data || error.message || "Failed to add to cart"
            )
        }
    }
)

export const updateCartQuantity = createAsyncThunk(
    "cart/updateCartQuantity",
    async ({ id, quantity }, { rejectWithValue }) => {
        try {
            const response = await updateCartQuantityApi(id, quantity)
            return { id, quantity: response.data.quantity }
        } catch (error) {
            return rejectWithValue(
                error.response?.data ||
                    error.message ||
                    "Failed to update cart quantity"
            )
        }
    }
)

export const removeFromCart = createAsyncThunk(
    "cart/removeFromCart",
    async (id, { rejectWithValue }) => {
        try {
            await removeFromCartApi(id)
            return id
        } catch (error) {
            return rejectWithValue(
                error.response?.data ||
                    error.message ||
                    "Failed to remove item from cart"
            )
        }
    }
)

export const placeOrder = createAsyncThunk(
    "cart/placeOrder",
    async (order, { rejectWithValue }) => {
        try {
            await placeOrderApi(order)
        } catch (error) {
            return rejectWithValue(
                error.response?.data || error.message || "Failed to place order"
            )
        }
    }
)

const initialState = {
    cartItems: [],
    isLoading: false,
    error: null,
    orderPlaced: false,
    total: 0
}

const calculateTotal = (cartItems) => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
}

const cartSlice = createSlice({
    name: "cartReducer",
    initialState,
    reducers: {
        resetOrderState: (state) => {
            state.orderPlaced = false
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle fetchCartItems actions
            .addCase(fetchCartItems.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchCartItems.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartItems = action.payload
                state.total = calculateTotal(state.cartItems)
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error?.message || "An error occurred"
            })

            // Handle addToCart actions
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.cartItems.push(action.payload)
                state.total = calculateTotal(state.cartItems)
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload || "An error occurred"
            })

            // Handle updateCartQuantity actions
            .addCase(updateCartQuantity.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateCartQuantity.fulfilled, (state, action) => {
                state.isLoading = false
                const item = state.cartItems.find(
                    (item) => item.id === action.payload.id
                )
                if (item) {
                    item.quantity = action.payload.quantity
                }
                state.total = calculateTotal(state.cartItems)
            })
            .addCase(updateCartQuantity.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload || "An error occurred"
            })

            // Handle removeFromCart actions
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.cartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload
                )
                state.total = calculateTotal(state.cartItems)
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.error =
                    action.payload ||
                    "An error occurred while removing from cart"
            })

            // Handle placeOrder actions
            .addCase(placeOrder.fulfilled, (state) => {
                state.cartItems = []
                state.orderPlaced = true
                state.total = 0
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.error =
                    action.payload ||
                    "An error occurred while placing the order"
            })
    }
})

export const { resetOrderState } = cartSlice.actions

export default cartSlice.reducer
