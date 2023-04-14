import React from 'react';
import {Logo} from '../types/media';

export const LogoMedia = function({data}:{data:Logo}){


    return (
        <div className="wrapperPoster">
        <div className="poster">
        <img className="logo" src={`data:image/jpg;base64,${data.logo}`} />
        {(data.raiting > 0.0?
        <p className="raiting" style={{backgroundColor:(data.raiting>=5?'green':'red')}}>{data.raiting}</p>
        :null)}
        </div>
        <div className="info">
        <h3>{data.name}</h3>
        <p>{data.genre}</p>
        </div>
        </div>
    )
}