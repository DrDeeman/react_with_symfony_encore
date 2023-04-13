import React from 'react';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import {SwiperData}from './swiperData';


export default function(){

    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<p>main page</p>}/>
        <Route path="/test" element={<SwiperData/>}/>
        </Routes>
        </BrowserRouter>
    )
}
