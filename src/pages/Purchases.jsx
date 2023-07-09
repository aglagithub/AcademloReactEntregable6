import React, { useState } from "react";
import { useEffect } from "react";
import { axiosEcommerce, getConfig } from "../utils/configAxios";
import Purchase from "../components/purchases/Purchase";

const Purchases = () => {
  const [purchasesHistory, setPurchasesHistory] = useState([]);

  //console.log("Config para llamer axios: ",getConfig())

  useEffect(() => {
    axiosEcommerce
      .get("/purchases", getConfig())
      .then(({ data }) => {
        //console.log(data);
        const orderPurchases = data.sort(
          (a,b) => {
           return ( new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() )
          }
        )
        setPurchasesHistory(orderPurchases);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="max-w-[700px] mx-auto">
      <h3>My Purchases</h3>
      <section className="grid gap-8 px-2">
      {purchasesHistory.map((purchase) => (
        <Purchase key={purchase.id} purchase={purchase} />
      ))}
      </section>
    </section>
  );
};

export default Purchases;
