import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component{

    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        }
    }
    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading:true});
       const order={
           ingredients:this.props.ingredients,
           price: this.props.totalPrice,
           customer:{
               name:'Nam Do',
               address:{
                   street: 'Lac Long Quan',
                   zipcode: '483934',
                   country:'Viet Nam'
               },
               email:'dongocnam01@gmail.com',            
           },
           deliveryMethod:'fastest'
       }
       axios.post('/orders.json',order)
            .then(resp=>{
                console.log(resp);
               this.setState({loading:false,purchasing:false})

            })
            .catch(err=>{
                console.log(err);
                this.setState({loading:false,purchasing:false})
            });

    }
    render(){
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Mail" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
                    <Button buttonType="Success" clicked={}>ORDER</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;