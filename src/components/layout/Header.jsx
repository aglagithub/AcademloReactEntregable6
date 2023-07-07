import React from "react";
import { Link } from "react-router-dom";
import { changeIsShowCart } from "../../store/slices/cart.slice";
import { useDispatch } from "react-redux";

const Header = () => {
 
  const dispatch =  useDispatch () 
  const handleClickShowCart= () =>{
    console.log("Toggle cart View.")
    dispatch(changeIsShowCart())

  }
  return (
    <header>
      <Link to="/">e-commerce</Link>
      <nav className="">
        <Link to={"/login"}>
          <i className="bx bx-user pr-4"> </i>
        </Link>
        <Link to={"/purchases"}>
          <i className="bx bx-box pr-4"></i>
        </Link>

        <button onClick={handleClickShowCart}>
          <i className="bx bx-cart pr-4"></i>
        </button>
      </nav>
    </header>
  );
};

export default Header;
