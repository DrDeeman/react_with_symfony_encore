import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {TFilm} from '../types/media';
import '../styles/pageFilm.scss';

export const Film = function(){
const [dataFilm, setDataFilm] = useState<TFilm | null>(null);
const [fullDescr, setFullDescr] = useState(false);
const {id} = useParams();

useEffect(()=>{
   fetch('/api/getFilm/'+id).then(response=>response.json()).then(result=>setDataFilm(result));
},[]);

    return (
        <>
        {(dataFilm?
       <div>
        <div className="preview">

            <div className='info'>
                <h2>{dataFilm.name}</h2>

                {(dataFilm.description?
                    <p className={'descr '+(fullDescr?'full':'')}>{dataFilm.description}
                    {(!fullDescr?<p className="all" onClick={()=>setFullDescr(true)}>Еще</p>:null)}
                </p>
                :null)}
                
                <p></p>
                </div>
        <div className="logo">
        <img src={`data:image/jpg;base64,${dataFilm.logo}`} />
        </div>     

        </div>
        </div> 
        :null)}
        </>
    )
}