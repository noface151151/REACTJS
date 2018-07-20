import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';

import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHangler';
class ContactData extends Component{

    state={
        orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder: 'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:5,
                        maxLength:10
                    }
                }, 
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder: 'Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipcode: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder: 'ZIP Code'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder: 'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder: 'Your E-mail'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },  
                deliveryMethod:{
                    elementType:'select',
                    elementConfig:{
                       options:[
                           {value:'fastest',displayValue:'Fasttest'},
                           {value:'cheapest',displayValue:'Cheapest'}
                        ]
                    },
                    value:'fastest' ,
                    validation:{},
                    valid:true
                }     
        },
        formIsValid:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        const formData={};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier]=this.state.orderForm[formElementIdentifier].value;
        }
       const order={
           ingredients:this.props.ings,
           price: this.props.price,
           orderData:formData
       }
       console.log(this.props.price);
       this.props.onOrderBurger(order);

    }

    checkValidity(value,rules){
        let isValid=true;
        if(rules.required){
            isValid=value.trim()!==''  && isValid;
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid=value.length<=rules.maxLength && isValid;
        }
        //console.log(isValid);
        return isValid;
    }
    inputChangedHandler=(event,inputIdentify)=>{
        const updatedOrderForm={
            ...this.state.orderForm
        };
        const updatedFormElement={
            ...updatedOrderForm[inputIdentify]
        };
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentify]=updatedFormElement;
        let formIsValid=true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid=updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});

    }
    render(){
        const formElementArray=[];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form= 
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(val=>(
                    <Input 
                        key={val.id} 
                        elementType={val.config.elementType} 
                        elementConfig={val.config.elementConfig} 
                        value={val.config.value}
                        changed={(event)=>this.inputChangedHandler(event,val.id)}
                        shouldValidate={val.config.validation}
                        touched={val.config.touched}
                        inValid={!val.config.valid}/>
                ))}
                <Button buttonType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>;
        if(this.props.loading){
            form = <Spinner />;
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps =state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onOrderBurger:(orderData)=>dispatch(actions.purchaseBurger(orderData))
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));