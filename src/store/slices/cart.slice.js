import { createSlice } from "@reduxjs/toolkit";
import { axiosEcommerce, getConfig } from "../../utils/configAxios";
const initialState = {
    products: [],
    isShowCart: false
}

const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        changeIsShowCart: (state) => {
            state.isShowCart = !state.isShowCart
        },
        setProducts: (state, action) => {
            const newProducts = action.payload
            state.products = newProducts
        }
    }
})

export const { changeIsShowCart, setProducts } = cartSlice.actions;

export const getCartProducts = () => (dispatch) => {
    axiosEcommerce.get("/cart", getConfig())
        .then(({ data }) => {
            //console.log("Productos en el carrito traidos por servicio", data)
            dispatch(setProducts(data))
        })
        .catch((err) => console.log(err))
}
//Add Product
export const addProductCart = (data) => (dispatch) => {
    axiosEcommerce.post("/cart", data, getConfig())
        .then(() => {
            //console.log("Productos en el carrito enviados por servicio", data)
            dispatch(getCartProducts())
        })
        .catch((err) => console.log(err))
}

//Delete Product
export const deleteProductCart = (productId) => (dispatch) => {
    axiosEcommerce.delete(`/cart/${productId}`, getConfig())
        .then(() => {
            //console.log("Id Producto a Borrar:",productId)
            //Vuelve a cargar los productos desp de borrar en DB
            dispatch(getCartProducts())
        })
        .catch((err) => console.log(err))

}

//Checkout
export const checkoutCart = () => (dispatch) => {
    axiosEcommerce.post("/purchases/",{} ,getConfig())
        .then(() => {
            //console.log("Checking Out:")
            //Vuelve a cargar los productos desp de hacer el checkout
            dispatch(getCartProducts())
        })
        .catch((err) => console.log(err))

}
export default cartSlice.reducer