import React,{Component} from 'react';
import Person from './Person/Person'

class Persons extends Component {
    constructor(props){
        super(props);
        console.log('[Persons.js] Constructor',props);
      }
    
      componentWillMount(){
        console.log('[Persons.js] componentWillMount()')
      }
      componentDidMount(){
        console.log('[Persons.js] componentDidMount()')
      }
      componentWillReceiveProps(nextProps){
          console.log('[UPDATE Persons.js] componentWillReceiveProps()',nextProps)
      }
      shouldComponentUpdate(nextProps,nextState){
        console.log('[UPDATE Persons.js] shouldComponentUpdate()',nextProps,nextState);
      //  console.log(this.props.persons);
        return nextProps.persons !== this.props.persons||
        nextProps.clicked !== this.props.clicked||
        nextProps.changed !== this.props.changed;
      }
      componentWillUpdate(nextProps,nextState){
        console.log('[UPDATE Persons.js] componentWillUpdate()',nextProps,nextState);
      }
    render(){
        console.log('[Persons.js]  render()')
       // console.log(this.props.persons);
     
         return this.props.persons.map((person,index)=>{
            return <Person 
               click={()=>this.props.clicked(index)}
               name={person.name} 
               age={person.age} 
               key={index}
               changed={(event)=>this.props.changed(event,index)}/>
           });
    }
}


export default Persons;