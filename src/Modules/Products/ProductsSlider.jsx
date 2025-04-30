import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../assets/images/slider-2.jpeg"
import img2 from "../../assets/images/slider-image-1.jpeg"
import img3 from "../../assets/images/slider-image-2.jpeg"
import img4 from "../../assets/images/slider-image-3.jpeg"


export default function ProductsSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };
  return (
    <Slider className="slider" {...settings} >
      <div>
       <img className="w-100" src={img1} alt="slider"/>
      </div>
      <div>
       <img className="w-100" src={img2} alt="slider"/>
      </div>
      <div>
       <img className="w-100" src={img3} alt="slider"/>
      </div>
      <div>
       <img className="w-100" src={img4} alt="slider"/>
      </div>
    </Slider>
  );
}