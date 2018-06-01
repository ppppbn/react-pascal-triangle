import React, { Component } from 'react';
import './App.css';

const bg = ['bg-primary', 'bg-success', 'bg-warning', 'bg-danger', 'bg-info', 'bg-violet', 'bg-dark'];
const bgGra = ['bg-1', 'bg-2', 'bg-3', 'bg-4', 'bg-5', 'bg-6', 'bg-7', 'bg-8', 'bg-9', 'bg-10', 'bg-11', 'bg-12'];

class App extends Component {
  constructor(){
    super();
    this.state = {
      exponent : 0,
      generated : false,
      exponentArray : [],
      screen : 1,
      gradient : false
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
    this.setState({
      screen : this.state.screen === 4 ? 1 : this.state.screen + 1
    });
  }

  toggleGradient = () => {
    this.setState({
      gradient : !this.state.gradient
    })
  }

  colorClass = (val, val2) => {
    console.log('gra', this.state.gradient);
    var customColor = this.state.gradient ? 
      bgGra[(val + val2)%12] : bg[(val + val2) % 7];
    return customColor + " list-element horizontal-center vertical-center";
  }

  render() {
    let screenClass;
    const gradient = this.state.gradient;
    switch(this.state.screen) {
      case 1 : 
        screenClass = " custom-display-flex custom-column";
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
          <div className={this.colorClass(val, val2)}>
            <h4 className="custom-display-inline-block text-white">{this.calculateValue(key, key2)}</h4>
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
              <button type="submit" className="btn btn-nav btn-primary">Generate</button>
              <button type="button" className="btn btn-nav btn-success" onClick={this.rotate}>Rotate</button>
              <button type="button" className="btn btn-nav btn-danger" onClick={this.toggleGradient}>{this.state.gradient ? 'Simple!' : 'Gradient!'}</button>
            </form>
          </div>
        </div>
        <div className={"text-center triangle-container" + screenClass}>
          {lists}
        </div>
        <div className="version-container hidden-xs">
          <h5>v2.0.0</h5>
        </div>
     </div>
    )
  }
}

export default App;
