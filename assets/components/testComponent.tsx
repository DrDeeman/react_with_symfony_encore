import React,{useState,useEffect} from 'react';


export default function(){

    const [state,setState] = useState<any | null>();

    useEffect(()=>{
       fetch('/test_api').then(response=>response.json()).then(result=>setState(result));
    },[]);

    return (
        <React.Fragment>
      <h1>test page</h1>
      <p>Data:{state?.value}</p>
      </React.Fragment>
    )
}