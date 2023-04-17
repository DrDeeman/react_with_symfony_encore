import React from 'react';
import {Link} from 'react-router-dom';
import {Logo} from '../types/media';

export const LogoMedia = function({type,data}:{type:string,data:Logo}){

    console.log(data);

    return (
        <div className="wrapperPoster">
            <Link to={'/'+type+'/'+data.id} relative="path">
        <div className="poster">
        <div className="logo">
        <img src={`data:image/jpg;base64,${data.logo}`} />
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