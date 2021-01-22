import React from "react";
import { Link } from "react-router-dom";

export const MainText = () => {
  return (
    <div className="col-sm-6 col-12">
      <div className="col-12 col-sm-10 main__social-text pt-4 text-sm-left text-center">
        <span className="font-weight-bold">Social</span> - это торговая
        площадка, предоставляющая возможность покупать и продавать товары.
      </div>
      <div className="col-12 col-sm-10 main__social-text pt-3 text-sm-left text-center">
        Мы работаем, чтобы у нас вы смогли найти абсолютно всё.
      </div>
      <div className="col-12">
        <Link to="/create-product/">
          <button className="btn btn-light custom-btn-light mt-3">
            Добавить товар
          </button>
        </Link>
      </div>
    </div>
  );
};
