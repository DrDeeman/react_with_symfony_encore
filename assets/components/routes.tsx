import React from 'react';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import TestComponent from './testComponent';


export default function(){

    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<p>main page</p>}/>
        <Route path="/test" element={<TestComponent/>}/>
        </Routes>
        </BrowserRouter>
    )
}
