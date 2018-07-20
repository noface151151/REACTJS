import React,{Component} from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import CheckOutSummary from '../../components/UI/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class CheckOut extends Component{

    componentDidMount(){
        //this.props.onInitPurchase();
    }
    CheckoutCancelled=()=>{
        this.props.history.goBack();
    }
    CheckoutContinued=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let summary=<Redirect to='/' />
       
        if(this.props.ings){
            const purchasedRedirect=this.props.purchased?<Redirect to='/' />:null;
                summary=   
                    <div>
                        {purchasedRedirect}
                        <CheckOutSummary ingredients={this.props.ings}
                        onCheckoutCancelled={()=>this.CheckoutCancelled()}
                        onCheckoutContinued={()=>this.CheckoutContinued()}/>
                        <Route path={this.props.match.path+'/contact-data'} 
                        component={ContactData} /> 
                    </div>
            
           
        }
        return(          
                summary
        )
    }
}

const mapStateToProps =state=>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

export default connect(mapStateToProps)(CheckOut);