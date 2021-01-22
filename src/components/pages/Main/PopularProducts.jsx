import React from "react";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ProductCard } from "./Products/ProductCard.jsx";
import jordan from "../../../images/jordan.jpg";
import russellHobbs from "../../../images/russell-hobbs.jpg";
import zaryadka from "../../../images/zaryadka.jpg";

SwiperCore.use([Pagination, Autoplay]);

export const PopularProducts = () => {
  return (
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
  );
};
