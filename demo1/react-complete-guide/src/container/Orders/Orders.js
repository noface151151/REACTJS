import React,{Component} from 'react';
import Order from '../../components/UI/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHangler'
class Orders extends Component{

    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
            .then(res=>{
                const fetchedOrders=[];
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id:key
                    });
                }
                this.setState({loading:false,orders:fetchedOrders})
            })
            .catch(err=>{
                this.setState({loading:false})
            })
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order=>(
                    <Order ingredients={order.ingredients} key={order.id} price={order.price} />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders,axios)