import React,{useState,useEffect} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import {LogoMedia} from './logos';
import {Poster, Media} from '../types/media';
import 'swiper/css';
import 'swiper/css/navigation';

export const SwiperData = function(){

    const [state,setState] = useState({});

    useEffect(()=>{
        fetch('/api/getPosters').then(response=>response.json()).then(result=>setState(result));
    },[]);

  
    return (
        <React.Fragment>
          {Object.keys(state).map((key:string,ind)=>
          <div className="wrapperSwiper" key={ind}>
      <Swiper
      modules={[Scrollbar]}
       spaceBetween={10}
       slidesPerView='auto'
       scrollbar={{ draggable: true }}
       onSwiper={(swiper) => console.log(swiper)}
       onSlideChange={() => console.log('slide change')}
       >     
         {(state[key as keyof (Media | {})] as Media).map((logo:Poster,i:number)=><SwiperSlide key={i}>
           <LogoMedia type={key} data={logo}/>
         </SwiperSlide>)}
      </Swiper>
      </div>
          )}
      </React.Fragment>
    )
}