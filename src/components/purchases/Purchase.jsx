import React from "react";
import { formatDDMMYY } from "../../utils/date";

const Purchase = ({ purchase }) => {
  const totalPrice = (purchase.product.price * purchase.quantity).toFixed(2)

  return (
    <article className="grid grid-cols-2 gap-2 text-sm items-center" >
      {/* Sección izquierda */}
      <section className="flex gap-2 items-center">
        <div className="h-[50px] aspect-square">
          <img className="h-fulh w-full object-contain" src={purchase.product.images[2].url} alt="" />
        </div>
        <span>{purchase.product.title} </span>
      </section>

      {/* Sección derecha */}
      <section className="grid text-center gap-3 justify-center font-semibold sm:grid-cols-3">
        <span>{formatDDMMYY(purchase.createdAt) }</span>
        <span  className="p-1 px-4 border-[1px] border-gray-400">{purchase.quantity}</span>
        <span>$ {totalPrice}</span>
      </section>
    </article>
  );
};

export default Purchase;
