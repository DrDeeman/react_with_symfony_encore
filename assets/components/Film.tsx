import React from 'react';
import {useParams} from 'react-router-dom';

export const Film = function(){
const {id} = useParams();

    return (
        <p>Film {id}</p>
    )
}