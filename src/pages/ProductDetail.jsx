import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { axiosEcommerce } from "../utils/configAxios";
import ListProducts from "../components/home/ListProducts";

const sliderStyles ={
  1:"-ml-[0%]",
  2:"-ml-[100%]",
  3:"-ml-[200%]"
}
const ProductDetail = () => {
  //almacena datos de producto
  const [product, setProduct] = useState(null);
  //Similar Products
  const [similarProducts, setSimilarProducts] = useState([]);

  //cantidad de producto
  const [quantity, setQuantity] = useState(1);
  const handleClickPlus = () => {
    setQuantity(quantity + 1);
  };
  //botón "-"
  const handleClickLess = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //Estado para el slider
  const [imageToShow, setImageToShow] = useState(1);
  const handleClickNextImage = () =>{
    if(imageToShow < 3){
      setImageToShow(imageToShow+1)
      console.log("image To Show +:",imageToShow)
    }
  }
  const handleClickPreviousImage = () =>{
    if(imageToShow >1){
      setImageToShow(imageToShow-1)
      console.log("image To Show -:",imageToShow)
    }
    
  }

  //botón "+"


  //pasa el parametro de la ruta a id
  const { id } = useParams();

  //Trae datos del ´producto
  useEffect(() => {
    axiosEcommerce
      .get(`/products/${id}`)
      .then(({ data }) => {
        console.log(`Datos del producto: ${id} .`, data);
        setProduct(data);
        console.log(product);
      })
      .catch((err) => {
        "Errores al traer producto", console.log(err);
      });
  }, [id]);

  //Trae produtos de la misma categoría que el producto actual
  useEffect(() => {
    if (product) {
      axiosEcommerce
        .get(`/products?categoryId=${product.categoryId}`)
        .then(({ data }) => {
          //console.log(`Datos del producto de la categoria dada: `, data);
          const productsFiltered = data.filter((item) => item.id != product.id);
          //console.log(`Datos del producto de la categoria dada filtrados: `, productsFiltered);
          setSimilarProducts(productsFiltered);
        })
        .catch((err) => {
          "Errores al traer productos de categosia dada:", console.log(err);
        });
    }
  }, [product]);

  return (
    <section className="p-2 max-w-[1000px] mx-auto">
      <section className="flex text-xs gap-2 items-center">
        <Link to="/">Home</Link>
        <div className="h-[6px] aspect-square rounded-full bg-red-500"></div>
        <span className="font-bold truncate w-[200px]"> {product?.title}</span>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 items-center">
        {/* Slider */}
        <article className="overflow-hidden relative">
          <section className={`flex w-[300%] ${sliderStyles[imageToShow]} transition-all duration-200`}>
            <div className="h-[300px] w-[calc(100%_/3)]">
              <img
                className="w-full h-full object-contain"
                src={product?.images[0].url}
              ></img>
            </div>
            <div className="h-[300px] w-[calc(100%_/3)]">
              <img
                className="w-full h-full object-contain"
                src={product?.images[1].url}
              ></img>
            </div>
            <div className="h-[300px] w-[calc(100%_/3)]">
              <img
                className="w-full h-full object-contain"
                src={product?.images[2].url}
              ></img>
            </div>
          </section>
          <button onClick={handleClickPreviousImage} className="absolute top-1/2 left-2 text-2xl bg-red-500 h-[35px] aspect-square rounded-full text-white -translate-y-1/2"><i className='bx bx-chevron-left'></i>  </button>
          <button onClick={handleClickNextImage} className="absolute top-1/2 right-2 text-2xl bg-red-500 h-[35px] aspect-square rounded-full text-white -translate-y-1/2"> <i className='bx bx-chevron-right'></i> </button>

        </article>

        {/* Detalle del producto */}
        <article className="grid gap-6">
          <div>
            <h4 className="text-gray-300 font-semibold">{product?.brand}</h4>
            <span className="ml-2 text-lg font-semibold truncate block">
              {product?.title}
            </span>
          </div>

          <section className="grid grid-cols-2">
            <article>
              <h4 className="text-gray-300 font-semibold">Price</h4>
              <span className="ml-2 text-lg font-semibold truncate block">
                $ {product?.price}
              </span>
            </article>

            <article>
              <h5 className="text-sm text-gray-300 font-semibold">Quantity</h5>
              <div className="flex border-[1px] max-w-max">
                <button
                  className="p-1 px-3 border-[1px]"
                  onClick={handleClickLess}
                >
                  -
                </button>
                <div className="p-1 px-4 border-[1px]">{quantity}</div>
                <button
                  className="p-1 px-3 border-[1px]"
                  onClick={handleClickPlus}
                >
                  +
                </button>
              </div>
            </article>
          </section>

          <button className="block w-full py-2 bg-red-500 text-white hover:bg-red-600 transition-colors rounded-md">
            Add to cart <i className="bx bx-cart"></i>
          </button>
          <p className="text-xs">{product?.description}</p>
        </article>
      </section>

      {/* similar products section */}
      <section>
        <h3>Discover similar items</h3>
        <ListProducts products={similarProducts} />
      </section>
    </section>
  );
};

export default ProductDetail;
