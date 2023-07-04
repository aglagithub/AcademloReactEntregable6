import axios from "axios";
import React, { useEffect, useState } from "react";
import { axiosEcommerce } from "../utils/configAxios";
import Product from "../components/home/Product";

const Home = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  // Traer Categosrias de productos
  useEffect(() => {
    //LLamada al servicio para obtener categorias
    
    axiosEcommerce.get("/categories")
    .then(({data})=>{
      console.log("Categorias: ",data)
      setCategories(data)
    })
    .catch((err)=>{console.log("Errores al traer categorias",err)})
  
  }, [])
//traer productos
useEffect(() => {
  //LLamada al servicio para obtener categorias
 
  axiosEcommerce.get("/products")
  .then(({data})=>{
    console.log("Productos:",data)
    setProducts(data)
  })
  .catch((err)=>{"Errores al traer productos",console.log(err)})

}, [])

  
  return (
    <section>
      <form type="text">
        <div>
          Home
          <input type="text" />
          <button>
            <i className="bx bx-search"></i>
          </button>
        </div>
        {/* Categorias */}
        <section className="border-solid border-2">
          <h4>Category</h4>
            <ul>
              <li>All</li>
              {
                categories.map((category) => (<li key={category.id}>{category.name}</li>))
              }
            </ul>
          
        </section>
        
          {/* Productos */}
          <section className="grid gap-10 p-2">
            {
              products.map((product) => (<Product key={product.id} product={product}/>))
            }
          </section>
      </form>
    </section>
  );
};

export default Home;
