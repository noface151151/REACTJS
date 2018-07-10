import React from 'react';


const cockpit = (props)=>{
    return(
        <button onClick={()=>props.togglePerson()}>Switch Person</button>
    )
}

export default cockpit;