import React,{Suspense} from 'react';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import {SwiperData}from './swiperData';
import {Film} from './Film';
import {Loader} from './loader';


export default function(){

    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<SwiperData/>}/>
        <Route path="/films/:id" element={<Film type="film"/>}/>
        <Route path="/serials/:id" element={<Film type="serial"/>}/>
        </Routes>
        </BrowserRouter>
    )
}
