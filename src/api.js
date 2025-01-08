import axios from "axios"

const API_BASE_URL = "http://localhost:5132/api"

export const fetchProductsApi = () => axios.get(`${API_BASE_URL}/products`)

export const fetchCartItemsApi = () => axios.get(`${API_BASE_URL}/cart`)

export const addToCartApi = (product) =>
    axios.post(`${API_BASE_URL}/cart`, product)

export const updateCartQuantityApi = (id, quantity) => {
    return axios.put(
        `${API_BASE_URL}/cart/update-quantity/${id}?newQuantity=${quantity}`
    )
}

export const removeFromCartApi = (id) =>
    axios.delete(`${API_BASE_URL}/cart/${id}`)

export const placeOrderApi = (order) =>
    axios.post(`${API_BASE_URL}/orders`, order)
