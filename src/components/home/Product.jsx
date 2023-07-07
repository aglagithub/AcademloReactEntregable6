import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  //console.log("Product: ", { product });
  const handleClickAddProduct = (e) =>{
     e.preventDefault()
     console.log("Add product")
  }
  return (
    <Link to={`/products/${product.id}`}>
      <div className="h-[200px] overflow-hidden p-4 relative group">
        <img
          className="w-full h-full object-contain opacity-100 group-hover:opacity-0 transition-opacity duration-500"
          src={product.images[0].url}
        ></img>
        <div className="absolute top-0 left-0 w-full h-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <img
            className="object-contain w-full h-full "
            src={product.images[1].url}
          ></img>
        </div>
      </div>
      <section>
        <h5>{product.brand}</h5>
        <h4>{product.title}</h4>
        <span>Price</span>
        <span>$ {product.price}</span>
        <button onClick={handleClickAddProduct}>
          <i className="bx bx-cart"></i>
        </button>
      </section>
    </Link>
  );
};

export default Product;
