import React from 'react';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import {SwiperData}from './swiperData';
import {Film} from './Film';
import {Serial} from './Serial';


export default function(){

    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<SwiperData/>}/>
        <Route path="/films/:id" element={<Film/>}/>
        <Route path="/serials/:id" element={<Serial/>}/>
        </Routes>
        </BrowserRouter>
    )
}
