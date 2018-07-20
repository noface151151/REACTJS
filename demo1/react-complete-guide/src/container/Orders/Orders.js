import React,{Component} from 'react';
import {connect} from 'react-redux';
import Order from '../../components/UI/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHangler';
import * as  action from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component{

    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
       this.props.onFetchOrders();
    }

    render(){
       let orders=<Spinner />;
       if(!this.props.loading){
        orders=<div>
            {this.props.orders.map(order=>(
                <Order ingredients={order.ingredients} key={order.id} price={order.price} />
            ))}
        </div>
        }
        return(
            orders
        );
    }
}

const mapStateToProps=state=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading
    }
}

const mapDispatchToProps=dispatchEvent=>{
    return{
        onFetchOrders:()=>dispatchEvent(action.fetchOrders())
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios))