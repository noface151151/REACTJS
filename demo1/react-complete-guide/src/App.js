import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons:[
      {name: "Max",age:28},
      {name: "Manu",age:29},
      {name: "Stephanie",age:26}
    ]
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

  nameChangeHandler=(event)=>{
      this.setState({ persons:[
        {name: "Max",age:28},
        {name: event.target.value,age:29},
        {name: "Stephanie",age:26}
      ]
    });
  }
  render() {
    return (
      <div className="App">
        <button onClick={()=>this.switchNameHandler('Nam')}>Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age} />
        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this,'Toan')}
          changed={this.nameChangeHandler}>My hobbies: Racing</Person>
          
        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}
         // click={this.switchNameHandler.bind(this,'Cuong')}
          />
      </div>
    );
  //  return React.createElement('div',{className:'App'},React.createElement('h1',null,'I\'m a React app'));
  }
}

export default App;
