import React from 'react';

type Logo = {
    id:Number,
    name:String,
    logo:String
  }

export const LogoMedia = function({data}:{data:Logo}){

    console.log(`url("data:image/jpeg;base64,${data.logo}")`);
    return (
        <div style={{backgroundImage:'url("data:image/jpeg;base64,'+data.logo+'")',border:'2px solid grey', borderRadius:'10px', height:'200px',width:'100px'}}>
        
        </div>
    )
}