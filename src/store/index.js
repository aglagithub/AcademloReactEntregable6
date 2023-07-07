import { configureStore } from "@reduxjs/toolkit";
import userInfo from "./slices/userInfo.slice.js";
import cart from "./slices/cart.slice.js";



export default configureStore({
reducer:{
    //Aqui es donde agregamos los estados globales
 userInfo,cart
}


})
 