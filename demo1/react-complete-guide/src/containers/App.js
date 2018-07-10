import React, { Component } from 'react';
import './App.css';
import Cockpit from '../components/Cockpit/Cockpit'
import Persons from '../components/Persons/Persons';

class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] Constructor',props);
    this.state= {
      persons:[
        {name: "Max",age:28},
        {name: "Manu",age:29},
        {name: "Stephanie",age:26}
      ],
      showPerson:false
    }
  }
  
  componentWillMount(){
    console.log('[App.js] componentWillMount()')
  }
  componentDidMount(){
    console.log('[App.js] componentDidMount()')
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log('[UPDATE App.js] shouldComponentUpdate()',nextProps,nextState);
  //  console.log(this.props.persons);
    return nextState.persons !== this.state.persons||
    nextState.showPerson!==this.state.showPerson;
  }

  componentWillUpdate(nextProps,nextState){
    console.log('[UPDATE App.js] componentWillUpdate()',nextProps,nextState);
  }
  switchNameHandler=(newName)=>{
    //console.log('Clicked');
      this.setState({ persons:[
        {name: newName,age:28},
        {name: "Manu",age:29},
        {name: "Stephanie",age:26}
      ]
    });
  }

  nameChangeHandler=(event,index)=>{
    // const personIndex=this.state.persons.findIndex(p=>{
    //   return p.id=id
    // })
    const person={...this.state.persons[index]};
    person.name=event.target.value;
    const persons=[...this.state.persons];
    persons[index]=person;
      this.setState({ persons:persons});
  }
  togglePersonHandler=()=>{
    const IsShowPerson=this.state.showPerson;
    this.setState({showPerson:!IsShowPerson});
  }
  deletePersonHandler=(index)=>{
   // console.log(this.state.persons)
  // const persons = this.state.persons;
    const persons = [...this.state.persons];
    persons.splice( index, 1 );
    this.setState( { persons: persons } );
  //  console.log(this.state.persons)
  }
  render() {

    console.log('App.js render()')
    let persons=null;
    
    if (this.state.showPerson)
      {
        persons=(
          <div>
           
           <Persons persons={this.state.persons}
           clicked={(index)=>this.deletePersonHandler(index)}
           changed={(event,index)=>this.nameChangeHandler(event,index)}/>
        </div>
        );
      }
    return (
      <div className="App">
       <button onClick={()=>{this.setState({showPerson:true})}}> Show Person</button>
      <h2>{this.props.tittle}</h2>
       <Cockpit togglePerson={()=>this.togglePersonHandler()} />
        {persons}
      </div>
        
    );
  //  return React.createElement('div',{className:'App'},React.createElement('h1',null,'I\'m a React app'));
  }
}

export default App;
