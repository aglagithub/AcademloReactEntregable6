import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeIsShowCart,
  checkoutCart,
  getCartProducts,
} from "../../store/slices/cart.slice";
import { useEffect } from "react";
import CartProduct from "./CartProduct";

const Cart = () => {
  const { isShowCart, products } = useSelector((store) => store.cart);

  const { token } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();

  //Maneja Botón de ocultar carrito
  const handleClickChangeShowCart = () => {
    dispatch(changeIsShowCart());
  };
  //console.log("Is cart Shown :", isShowCart);

  // Manejador Botón de checkout
  const handleClickCheckout = () => {
    //console.log("Checkout Clicked")
    dispatch(checkoutCart());
  };

  //calculo del valor total en el carrito
  console.log("productos:",products)
  //const totalPriceCheckout=666
  
  const totalPriceCheckout = products.reduce(
    (acc, product) => acc + (product.quantity * product.product.price), 0
  );

  useEffect(() => {
    if (token && isShowCart) {
      dispatch(getCartProducts());
    }
  }, [isShowCart]);

  return (
    <section
      className={`fixed top-0 p-2 border-l-2 border-black bg-white h-screen w-[300px] ${
        isShowCart && token ? "right-0 " : "-right-full "
      } transition-all duration-200 shadow-2xl shadow-black/30 grid grid-rows-[auto_1fr_auto]`}
    >
      <button
        onClick={handleClickChangeShowCart}
        className="absolute top-3 right-3 font-bold text-xl text-red-500"
      >
        <i className="bx bxs-x-circle"></i>
      </button>
      <h3 className="font-bold text-xl">Shopping Cart</h3>

      {/* Productos en el carrito */}
      <section className="py-4 grid gap-6 content-start overflow-y-auto">
        {console.log("pruducts in car:", products)}
        {products.map((cartProduct) => (
          <CartProduct key={cartProduct.id} cartProduct={cartProduct} />
        ))}
      </section>
      {/* Total Price */}
      <section className="border-t-[1px] border-gray-400 p-4 grid grid-cols-2 grid-rows-2 gap-x-40">
        <span>Total</span>
        <span className="text-end">${(totalPriceCheckout).toFixed(2)}</span>

        <button
          onClick={handleClickCheckout}
          className="col-span-2 block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors"
        >
          Check out
        </button>
      </section>
    </section>
  );
};

export default Cart;
