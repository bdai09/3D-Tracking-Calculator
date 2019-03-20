import React, { Component } from 'react';
import './App.css';


const isOperator = /[x/+‑]/,
      endsWithOperator = /[x+‑/]$/,
      clearStyle = {background: '#ac3939'},
      operatorStyle = {background: '#666666'},
      equalsStyle = {
        background: '#004466',
        position: 'absolute',
        height: 130,
        bottom: 5
      };
      

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: '0',
      prevVal: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: ''
    }
    this.maxDigitWarning = this.maxDigitWarning.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.cleanUp = this.cleanUp.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
  }
  cleanUp() {
    this.setState({
      currentVal: '0',
      prevVal: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: ''
    });
  }
  maxDigitWarning() {
    this.setState({
      currentVal: 'Digit Limit Met',
      prevVal: this.state.currentVal
    });
    setTimeout(() => this.setState({currentVal: this.state.prevVal}), 1000);
  }
  
  handleEvaluate() {
    if (!this.state.currentVal.includes('Limit')) {
      let expression = this.state.formula;
      if (endsWithOperator.test(expression)) expression = expression.slice(0, -1);
      expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
      let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
      this.setState({
        currentVal: answer.toString(),
        formula: expression.replace(/\*/g, '⋅').replace(/-/g, '‑') + '=' + answer,
        prevVal: answer,
        evaluated: true
      });
    }
  }
    
  handleOperators(e) { 
    if (!this.state.currentVal.includes('Limit')) {
      this.setState({currentVal: e.target.value,evaluated: false});
      if (this.state.formula.includes('=')) {
        this.setState({formula: this.state.prevVal + e.target.value}); // comment 1
      } else {
        this.setState({ // comment 2
          prevVal: !isOperator.test(this.state.currentVal) ? 
            this.state.formula : 
            this.state.prevVal,
          formula: !isOperator.test(this.state.currentVal) ? 
            this.state.formula += e.target.value : 
            this.state.prevVal += e.target.value
        });
      }
    }
  }
  
  handleNumbers(e) {
    if (!this.state.currentVal.includes('Limit')) {
      this.setState({evaluated: false})
      if (this.state.currentVal.length > 21) {
        this.maxDigitWarning();
      } else if (this.state.evaluated === true) {
        this.setState({
          currentVal: e.target.value,
          formula: e.target.value != '0' ? e.target.value : '',
        });
      } else {
        this.setState({
          currentVal: 
            this.state.currentVal == '0' || 
            isOperator.test(this.state.currentVal) ? 
            e.target.value : this.state.currentVal + e.target.value,
          formula:  
            this.state.currentVal == '0' && e.target.value == '0' ?
            this.state.formula : 
            /([^.0-9]0)$/.test(this.state.formula) ? 
            this.state.formula.slice(0, -1) + e.target.value :
            this.state.formula + e.target.value,
        });
      }
    }
  }

  handleDecimal() {
    if (this.state.evaluated === true) {
      this.setState({
        currentVal: '0.',
        formula: '0.',
        evaluated: false});
    } else if (!this.state.currentVal.includes('.') &&
      !this.state.currentVal.includes('Limit')) {
      this.setState({evaluated: false})
      if (this.state.currentVal.length > 21) {
        this.maxDigitWarning();
      } else if (endsWithOperator.test(this.state.formula) || 
        this.state.currentVal == '0' && this.state.formula === '') {
        this.setState({
          currentVal: '0.',
          formula: this.state.formula + '0.'
        });         
      } else {
        this.setState({
          currentVal: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + '.',
          formula: this.state.formula + '.',
        });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <div className='App-body'>
          <div className="formulaScreen">{this.state.formula} </div>
          <div id="display" className="outputScreen"> {this.state.currentVal} </div>
          <div>
        <button id="clear"    value='AC' onClick={this.cleanUp} className='jumbo' style={clearStyle}>AC</button>
        <button id="divide"   value='/'  onClick={this.handleOperators} style={operatorStyle}>/</button>
        <button id="multiply" value='x'  onClick={this.handleOperators} style={operatorStyle}>x</button>
        <button id="seven"    value='7'  onClick={this.handleNumbers} >7</button>
        <button id="eight"    value='8'  onClick={this.handleNumbers} >8</button>
        <button id="nine"     value='9'  onClick={this.handleNumbers} >9</button>
        <button id="subtract" value='‑'  onClick={this.handleOperators} style={operatorStyle}>-</button>
        <button id="four"     value='4'  onClick={this.handleNumbers} >4</button>
        <button id="five"     value='5'  onClick={this.handleNumbers} >5</button>
        <button id="six"      value='6'  onClick={this.handleNumbers} >6</button>
        <button id="add"      value='+'  onClick={this.handleOperators} style={operatorStyle}>+</button>
        <button id="one"      value='1'  onClick={this.handleNumbers} >1</button>
        <button id="two"      value='2'  onClick={this.handleNumbers} >2</button>
        <button id="three"    value='3'  onClick={this.handleNumbers} >3</button>
        <button id="zero"     value='0'  onClick={this.handleNumbers} className='jumbo'>0</button>
        <button id="decimal"  value='.'  onClick={this.handleDecimal} >.</button>
        <button id="equals"   value='='  onClick={this.handleEvaluate} style={equalsStyle}>=</button>
      </div>
        </div>
      </div>
    )
  }
};



export default App;
