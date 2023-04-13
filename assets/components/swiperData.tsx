import React,{useState,useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {LogoMedia} from './logos';
import 'swiper/css';

type Logo = {
  id:Number,
  name:String,
  logo:String
}
export const SwiperData = function(){

    const [state,setState] = useState<Array<Logo>>([]);

    useEffect(()=>{
       fetch('/test_api').then(response=>response.json()).then(result=>setState(result));
    },[]);

    return (
        <React.Fragment>
      <Swiper>     
         {state.map((logo,i)=><SwiperSlide key={i}>
           <LogoMedia data={logo}/>
         </SwiperSlide>)}
      </Swiper>
      </React.Fragment>
    )
}