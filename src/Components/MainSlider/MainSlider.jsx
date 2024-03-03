import React from 'react'
import Slider from "react-slick";
import img1 from '../../images/slider-image-1.jpeg'
import img2 from '../../images/slider-image-2.jpeg'
import img3 from '../../images/slider-image-3.jpeg'

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
      };

  return (
    <Slider {...settings}>
     <div>
      <img style={{height:'300px'}} src={img1} alt="" className='w-100'/>
     </div>
        <div>
      <img style={{height:'300px'}} src={img2} alt="" className='w-100'/>
        </div>
        <div>
      <img style={{height:'300px'}} src={img3} alt="" className='w-100'/>
        </div>
    
    </Slider>
  );
}
