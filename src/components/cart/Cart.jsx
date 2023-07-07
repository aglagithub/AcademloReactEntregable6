import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeIsShowCart } from "../../store/slices/cart.slice";

const Cart = () => {
  const { isShowCart } = useSelector((store) => store.cart);
  const { token } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();
  const handleClickChangeShowCart = () => {
    dispatch(changeIsShowCart());
  };
  //console.log("Is cart Shown :", isShowCart);
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
        <i class="bx bxs-x-circle"></i>
      </button>
      <h3 className="font-bold text-xl">Shopping Cart</h3>
      {/* Productos en el carrito */}
      <section></section>
      {/* Total Price */}
      <section className="border-t-[1px] border-gray-400 p-4 grid grid-cols-2 grid-rows-2 gap-x-40">
        <span>Total</span>
        <span className="text-end">$$</span>

        <button className="col-span-2 block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors">
          Check out
        </button>
      </section>
    </section>
  );
};

export default Cart;
