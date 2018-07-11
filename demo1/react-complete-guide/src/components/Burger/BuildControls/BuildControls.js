import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
]
const buildControls = (props) =>(
    <div className={classes.BuildControls}>
        <p>Current Price: {props.currentPrice.toFixed(2)}</p>
        {controls.map((value,index)=>(
            <BuildControl 
                label={value.label} 
                type={value.type} 
                key={value.label} 
                added={()=>props.ingredientAdd(value.type)}
                removed={()=>props.ingredientRemove(value.type)}
                disabled={props.disabled[value.type]}/>
        ))}
        
    </div>
);
export default buildControls