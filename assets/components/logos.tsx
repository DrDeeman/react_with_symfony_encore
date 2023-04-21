import React,{useState, useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import {Poster} from '../types/media';

export const LogoMedia = function({type,data}:{type:string,data:Poster}){

const [state, setState] = useState(false);
const ref = useRef<HTMLDivElement>(null);

useEffect(()=>{
if(ref.current){
    if(IntersectionObserver){
    const observer = new IntersectionObserver(
        (entries)=>{
            entries.forEach(entry=>{
            if(entry.intersectionRatio > 0.01)
            setState(true);
            });
        },
        {
            threshold:0.01
        });
        observer.observe(ref.current);
} else setState(true);
}
},[]);

    return (
        <div ref={ref} className="wrapperPoster">
            <Link to={'/'+type+'/'+data.id} relative="path">
        <div className="poster">
        <div className="logo">
        {(state
            ?
            <img src={`data:image/jpg;base64,${data.logo}`} />
            :
            <img className='preload'/>)}
        </div>
        {(data.raiting > 0.0?
        <p className="raiting" style={{backgroundColor:(data.raiting>=5?'green':'red')}}>{data.raiting}</p>
        :null)}
        </div>
        </Link>
        <div className="info">
        <h3>{data.name}</h3>
        <p>{data.genre}</p>
        </div>
        
        </div>
    )
}