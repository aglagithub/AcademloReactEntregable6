import React from "react";
import Product from "./Product"

const ListProducts = ({products}) => {
  return (
    <div>
      {/* Productos */}
      <section className="grid gap-10 p-2">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </section>
    </div>
  );
};

export default ListProducts;
