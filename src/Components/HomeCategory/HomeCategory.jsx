import axios from 'axios'
import { baseURL } from '../BaseURL/BaseUrl'
import Slider from "react-slick";
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import Category from '../Category/Category';
import CategoriesModal from '../CategoriesModal/CategoriesModal';

export default function HomeCategory() {


    function category(){
        return  axios.get(`${baseURL}/api/v1/categories`)
    }
    const {data,isLoading}=useQuery('getCategory',category);
    

    if(isLoading){
        return <Loading/>
    }
    var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll:5,
    arrows:false
  };
  return (
        <div className="container my-5 py-5">
            <h3 className='mb-3'>Shop popular Categories</h3>
            <div className="row" >
    <Slider {...settings}>
        {data?.data?.data.map(category=>{
            return <div key={category._id}>
                <CategoriesModal  category={category}/>
                </div>
        
    })}
      
    </Slider>
    </div>
    </div>
  );
}
  

