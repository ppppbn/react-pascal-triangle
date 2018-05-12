import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      exponent : 0,
      generated : false,
      exponentArray : [],
      screen : 1
    }
  }

  changeExponent = (e) => {
    let value = e.target.value;
    value = value > 15 ? 15 : value < 0 ? 0 : value;
    this.setState({
      exponent: Number(value)
    })
  }

  generate = (e) => {
    e.preventDefault();
    this.setState({
      exponentArray : Array.apply(null, {length: this.state.exponent}).map(Number.call, Number),
      generated : this.state.exponent ? true : false
    })
  }

  calculateValue = (row, column) => this.factorial(row) / (this.factorial(column) * this.factorial(row - column));

  factorial = (number) => number >= 0 ? (number !== 0 ? number * this.factorial(number - 1) : 1) : -1 ;

  rotate = () => {
    console.log('screen',this.state.screen);
    this.setState({
      screen : this.state.screen === 4 ? 1 : this.state.screen + 1
    })
  }

  render() {
    let screenClass;
    switch(this.state.screen) {
      case 1 : 
        screenClass = "";
        break;
      case 2 : 
        screenClass = " custom-display-flex custom-row-reverse horizontal-center";
        break;
      case 3 :
        screenClass = " custom-display-flex custom-column-reverse";
        break;
      case 4 :
        screenClass = " custom-display-flex custom-row horizontal-center";
        break;
      default :
        screenClass = "";
    }

    let lists = this.state.exponentArray.map((val, key) => {
      let row = this.state.exponentArray.slice(0, key + 1).map((val2, key2) => {
        return (
          <div className="list-element horizontal-center vertical-center custom-display-inline-block">
            <h4 className="custom-display-inline-block">{this.calculateValue(key, key2)}</h4>
          </div>
        )
      })
      return (
        <div className="text-center big-list-container">
          {row}
        </div>
      )
    })

    return (
      <div>
        <div className="App vertical-center horizontal-center">
          <div className="input-container">
            <form onSubmit={this.generate}>
              <input type="number" className="form-control" placeholder="Enter n?" value={this.state.exponent ? this.state.exponent : ""} onChange={this.changeExponent}></input>
              <button type="submit" className="btn btn-primary">Generate</button>
              <button type="button" className="btn btn-success" onClick={this.rotate}>Rotate</button>
            </form>
          </div>
        </div>
        <div className={"text-center triangle-container" + screenClass}>
          {lists}
      </div>
     </div>
    )
  }
}

export default App;
