// import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { DotLoader } from "react-spinners";
import useCategories from "../../CustomHooks/useCategories";



export default function CategoriesSlider() {

  const { data, isLoading } = useCategories()

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 10,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    speed: 6000,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (

    <>
      {!isLoading ? <Slider  {...settings} >


        {data?.data?.data?.map((category) =>
          <div className="apiSlider">
            <img className="w-100" src={category?.image} alt="slider" />
            <h5>{category?.name}</h5>
          </div>
        )}


      </Slider> : <div className="d-flex align-items-center justify-content-center" ><DotLoader
        color="#000"
        size={30}
      /></div>}
    </>

  );
}
