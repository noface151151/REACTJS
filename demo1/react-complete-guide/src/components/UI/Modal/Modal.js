import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxxx';
import Backdrop from '../Backdrop/Backdrop'
import Button from '../Button/Button';
const modal=(props)=>(
    <Aux>
        <Backdrop show={props.show} clicked={props.Modalclosed}/>
        <div style={{
            transform:props.show?'translateY(0)':'translateY(-100vh)',
            opacity:props.show?'1':'0'
        }} className={classes.Modal}>
            {props.children}
        <Button buttonType="Success" clicked={()=>props.cancelPurchaseHandler()}> CANCEL </Button>
        <Button buttonType="Danger" clicked={()=>props.continuePurchaseHandler()}> CONTINUE </Button>
        
        </div>
    </Aux>
);

export default modal;