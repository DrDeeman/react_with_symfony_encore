import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import {TFilm, TSerial} from '../types/media';
import {Loader} from './loader';
import '../styles/pageFilm.scss';

export const Film = function({type}:{type:string}){
const [fullDescr, setFullDescr] = useState(false);
const {id} = useParams();


const {isLoading, isFetching, error,data:dataMedia}= useQuery<TFilm | TSerial, ErrorCallback>(
    [(type=='film'?'film':'serial'),id],
    ()=>fetch('/api/'+(type=='film'?'getFilm':'getSerial')+'/'+id).then(response=>response.json())
  );
/*
const [dataFilm, setDataFilm] = useState<TFilm | null>(null);
useEffect(()=>{
   fetch('/api/'+()+'/'+id).then(response=>response.json()).then(result=>setDataFilm(result));
},[]);
*/
console.log('film');
    return (
        <>
         {(isLoading || isFetching) && <Loader/>}
        {dataMedia &&
       <div>
        <div className="preview">

            <div className='info'>
                <h2>{dataMedia.name}</h2>

                {(dataMedia.description?
                    <p className={'descr '+(fullDescr?'full':'')}>{dataMedia.description}
                    {(!fullDescr?<p className="all" onClick={()=>setFullDescr(true)}>Еще</p>:null)}
                </p>
                :null)}
                
                <p></p>
                </div>
        <div className="logo">
        <img src={`data:image/jpg;base64,${dataMedia.logo}`} />
        </div>     

        </div>
        </div> }

        </>
    )
}