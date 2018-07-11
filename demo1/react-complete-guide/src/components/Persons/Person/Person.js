import React,{Component} from 'react';
import PropTypes from 'prop-types';


class Person extends Component{
    constructor(props){
        super(props);
        console.log('[Person.js] Constructor',props);
      }
    
      componentWillMount(){
        console.log('[Person.js] componentWillMount()')
      }
      componentDidMount(){
        console.log('[Person.js] componentDidMount()');
        this.inputElement.focus();
      }
    render(){
        console.log('[Person.js]  render()')
        return(
            <div>
                <p onClick={this.props.click}> I 'm {this.props.name} and I am {this.props.age} years old!</p>
                <p> {this.props.children} </p>
                <input type="text" onChange={this.props.changed} ref={(inp)=>{this.inputElement=inp}}/>
            </div>
        ); 
    }
}

Person.propTypes={
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};
export default Person;