import React from "react";
import { useDispatch } from "react-redux";
import { deleteProductCart } from "../../store/slices/cart.slice";

const CartProduct = ({ cartProduct }) => {
  const dispach = useDispatch()
  //console.log("Producto en el carrito: a renderizar",cartProduct)

  //Manejador de botón de borrado:

const handleClickDelete = () =>{
  console.log("Producto a Borrar:",cartProduct.id)
dispach(deleteProductCart(cartProduct.id))
}
  const totalPrice = (cartProduct.quantity * cartProduct.product.price).toFixed(
    2
  );
  //console.log("Costo de producto: ", totalPrice);
  return (
    <article className="grid grid-cols-[auto_1fr_auto] grid-rows-[1fr_auto] gap-y-2 ">
      <div className="h-[90px] aspect-square p-2">
        <img
          className="w-full h-full object-contain"
          src={cartProduct.product.images[0].url}
          alt=""
        />
      </div>

      {/* Quantity section */}
      <div>
        <span className="text-sm line-clamp-2"> {cartProduct.product.title}</span>
        <article className="mt-4">
          <div className="flex border-[1px] max-w-max">
            <button className="p-1 px-3 border-[1px]">-</button>
            <div className="p-1 px-4 border-[1px]">{cartProduct.quantity}</div>
            <button className="p-1 px-3 border-[1px]">+</button>
          </div>
        </article>
      </div>
      <i onClick={handleClickDelete} className="bx bxs-trash text-end cursor-pointer justify-self-end self-start"></i>
      <span className="col-span-2 text-end text-sm">Total:</span>
      <span  className="px-2 text-sm">${totalPrice}</span>
    </article>
  );
};

export default CartProduct;
