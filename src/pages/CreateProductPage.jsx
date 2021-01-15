import React from "react";

export const CreateProductPage = (props) => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container create-product">
      <form onSubmit={onSubmit}></form>
    </div>
  );
};
