import React from "react";
import { MainText } from "./MainText.jsx";
import { PopularProducts } from "./PopularProducts.jsx";

export const Main = () => {
  return (
    <div className="main container">
      <div className="row">
        <MainText />
        <PopularProducts />
      </div>
    </div>
  );
};
