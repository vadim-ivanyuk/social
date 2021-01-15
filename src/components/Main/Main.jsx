import React from "react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import { withAuth } from "../../hoc/withAuth.jsx";
import { withFirebase } from "../../hoc/withFirebase.jsx";
import { ProductCard } from "./Products/ProductCard.jsx";
import jordan from "../../images/jordan.jpg";
import russellHobbs from "../../images/russell-hobbs.jpg";
import zaryadka from "../../images/zaryadka.jpg";

SwiperCore.use([Pagination, Autoplay]);

const Main = () => {
  return (
    <div className="main container">
      <div className="row">
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
        <div className="popular col-sm-6 col-12 mt-3">
          <div className="col-12 mt-2 mt-sm-4 pt-sm-1">
            <h2 className="popular-products text-sm-left text-center">
              Популярные товары
            </h2>
          </div>
          <div className="mt-sm-1">
            <Swiper
              spaceBetween={0}
              slidesPerView={window.innerWidth > 1053 ? 2 : 1}
              loop={true}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              // onSlideChange={() => console.log("slide change")}
            >
              <SwiperSlide>
                <ProductCard
                  title="Air Jordan 1 Retro High OG"
                  price="6,590.00"
                  image={jordan}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  title="Портативный фитнес-блендер RUSSELL HOBBS"
                  price="719.00"
                  image={russellHobbs}
                />
              </SwiperSlide>
              <SwiperSlide>
                <ProductCard
                  title="Беспроводное зарядное устройство"
                  price="499.00"
                  image={zaryadka}
                />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(withFirebase(Main));
