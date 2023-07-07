import axios from "axios";
import React, { useEffect, useState } from "react";
import { axiosEcommerce } from "../utils/configAxios";
import Product from "../components/home/Product";
import ListProducts from "../components/home/ListProducts";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");

  //filtrado de productos
  const productsByName = products.filter((product) =>
    product.title.toLowerCase().includes(productName)
  );
  //console.log("Productos filtrados:", productsByName);

  //manejo de selección catgoria
  const handleClickCategory = (e) => {
    setCurrentCategory(e.target.dataset.category);
  };
  // Manejo de seleccion de procuto
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene recarga de la página
    const currentProductName = e.target.productName.value;
    console.log("Selected Product", currentProductName);
    setProductName(currentProductName.toLowerCase());
  };

  // Traer Categosrias de productos
  useEffect(() => {
    //LLamada al servicio para obtener categorias

    axiosEcommerce
      .get("/categories")
      .then(({ data }) => {
        //console.log("Categorias: ", data);
        setCategories(data);
      })
      .catch((err) => {
        console.log("Errores al traer categorias", err);
      });
  }, []);
  //traer productos
  useEffect(() => {
    //LLamada al servicio para obtener categorias

    axiosEcommerce
      .get("/products")
      .then(({ data }) => {
        //console.log("Productos:", data);
        setProducts(data);
      })
      .catch((err) => {
        "Errores al traer productos", console.log(err);
      });
  }, []);

  //Efecto para detectar caombio de categoria
  useEffect(() => {
    //LLamada al servicio para obtener productos por categoria filtradas

    axiosEcommerce
      .get(`/products?categoryId=${currentCategory}`)
      .then(({ data }) => {
        //console.log("Productos En categoria Filtrada:", data);
        setProducts(data);
      })
      .catch((err) => {
        "Errores al traer En categoria Filtrada:", console.log(err);
      });
  }, [currentCategory]);

  return (
    <section>
      <form onSubmit={handleSubmit} type="text">
        <div>
          Home
          <input id="productName" type="text" />
          <button>
            <i className="bx bx-search"></i>
          </button>
        </div>
        {/* Categorias */}
        <section className="border-solid border-2">
          <h4>Category</h4>
          <ul>
            <li onClick={handleClickCategory} data-category={""}>
              All
            </li>
            {categories.map((category) => (
              <li
                onClick={handleClickCategory}
                data-category={category.id}
                key={category.id}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </section>

        {/* Productos */}

        <ListProducts products={productsByName} />
      </form>
    </section>
  );
};

export default Home;
