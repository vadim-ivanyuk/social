import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";

export const ProductCard = (props) => {
  return (
    <div className="product-card p-3">
      <div className="product-card__img">
        <img src={props.image} alt="" className="img" />
        <div className="favorite-icon">
          <FavoriteIcon
            fontSize="inherit"
            className="cursor-pointer favorite-icon__disabled"
          />
        </div>
      </div>
      <div className="product-card__body">
        <div className="product-card__title">
          <p className="title mb-2 mt-1">{props.title}</p>
        </div>
        <div className="product-card__price">
          <p className="price">Цена: {props.price} UAH</p>
        </div>
        <div>
          <button className="btn btn-light custom-btn-light">Подробнее</button>
        </div>
      </div>
    </div>
  );
};
