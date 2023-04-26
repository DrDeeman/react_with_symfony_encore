import React,{useState, useMemo, useRef} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y,Lazy } from 'swiper';
import {useParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import {TFilm, TSerial} from '../types/media';
import {Loader} from './loader';
import '../styles/pageFilm.scss';


export const Film = function({type}:{type:string}){
const [activeIndex,setActiveIndex] = useState(0);
const [fullDescr, setFullDescr] = useState(false);
const [visibleScreen, setVisibleScreen] = useState(0);
const swiperRef = useRef() as any;
const {id} = useParams();


const {isLoading, isFetching, error,data:dataMedia}= useQuery<TFilm | TSerial, ErrorCallback>(
    [(type=='film'?'film':'serial'),id],
    ()=>fetch('/api/'+(type=='film'?'getFilm':'getSerial')+'/'+id).then(response=>response.json()),
    {staleTime:Infinity}
  );

const screenshots = useMemo(()=>dataMedia?.screenshots?.map(
    (screen,i)=><div key={i} className='videoBlock' style={{backgroundImage:`url(${screen})`}}></div>
    ),[dataMedia]);

    return (
        <>
         {(isLoading || isFetching) && <Loader/>}
        {dataMedia &&
       <div className='outWrapperPage'>
        <div className='innerWrapperPage'>
        <div className="preview" style={{backgroundImage:`url(${dataMedia.preview})`}}/>
        <div className='info'>
                <h2>{dataMedia.name}</h2>

                {(dataMedia.description?
                    <p className={'descr '+(fullDescr?'full':'')}>{dataMedia.description}
                    {(!fullDescr?<p className="all" onClick={()=>setFullDescr(true)}>Еще</p>:null)}
                </p>
                :null)}
                
               
               {screenshots?.[visibleScreen]}
               <div className='wrapperScreenshots'>
               <Swiper
        modules={[Scrollbar, Navigation]}
       slidesPerView='auto'
       //onBeforeInit={(swiper) =>swiperRef.current = swiper}
       navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
        disabledClass: 'disable' // When the navigation button is not available, the Class is added, that is, when the Swiper index is 0, the last Class class name without prevel will add a disable, which is .swiper-button-prev .disable
      }}
       scrollbar={{ draggable: true }}
       onSlideChange={(e) =>setActiveIndex(e.activeIndex)}
       >     
         {dataMedia.screenshots?.map((url,i)=><SwiperSlide key={i} onClick={()=>setVisibleScreen(i)}>
           <img src={url} style={{paddingLeft:'5px', paddingRight:'5px'}}/>
         </SwiperSlide>
         )}
      </Swiper>
      <div className="swiper-button-prev" style={{display:(activeIndex>0?'block':'none')}}/>
      <div className="swiper-button-next" style={{display:(screenshots?.length && activeIndex!=screenshots.length-5?'block':'none')}}/>
       <div className="indicator">{screenshots?.map((img,i)=>i>=4?<span key={i} className={activeIndex==i-4?'_active':''}></span>:null)}</div>
        </div>

                </div> 
                </div>
        </div> 
        }

        </>
    )
}