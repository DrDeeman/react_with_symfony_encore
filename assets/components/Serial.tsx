import React from 'react';
import {useParams} from 'react-router-dom';

export const Serial = function(){
const {id} = useParams();

    return (
        <p>Serial {id}</p>
    )
}