import React,{useState,useEffect,useMemo, useCallback} from 'react';
import {useQuery} from 'react-query';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y,Lazy } from 'swiper';
import {LogoMedia} from './logos';
import {Poster, Media} from '../types/media';
import {Loader} from './loader';
import 'swiper/css';
import 'swiper/css/navigation';


export const SwiperData = function(){

const [visibleLoader, setVisibleLoader] = useState(false);

/*
  const [state,setState] = useState<Media | {}>({});

    useEffect(()=>{
        fetch('/api/getPosters').then(response=>response.json()).then(result=>setState(result));
    },[]);
   */
    

    const {isLoading,isFetching,error,data:state}= useQuery<Media,Error>(
      'posters',
      ()=>fetch('/api/getPosters').then(response=>response.json()),
      {staleTime:Infinity}
    );
  
  


useEffect(()=>{
  setVisibleLoader(true);
},[]);


    return (
      <>
    
    {(!visibleLoader || isFetching) && <Loader/>}

    {visibleLoader && state &&
        <React.Fragment>
          {Object.keys(state).map((key:string,ind)=>
          <div className="wrapperSwiper" key={ind}>
      <Swiper
      modules={[Scrollbar]}
       spaceBetween={10}
       slidesPerView='auto'
       scrollbar={{ draggable: true }}
       onSlideChange={() => console.log('slide change')}
       >     
         {(state[key]).map((logo:Poster,i:number)=><SwiperSlide key={i}>
           <LogoMedia type={key} data={logo}/>
         </SwiperSlide>)}
      </Swiper>
      </div>
          )}
      </React.Fragment>
      }

      </>
    )
}