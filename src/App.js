import React, { Component } from 'react';
import './App.scss';
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valNew: '0',
      valOld: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: '',
      beforeIs:''
    }
    this.reachMax = this.reachMax.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleEvaluate = this.handleEvaluate.bind(this);
    this.cleanUp = this.cleanUp.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleNumbers = this.handleNumbers.bind(this);
  }
  cleanUp() {
    this.setState({
      valNew: '0',
      valOld: '0',
      formula: '',
      currentSign: 'pos',
      lastClicked: '',
      beforeIs:''
    });
  }
  reachMax() {
    this.setState({
      valNew: 'Reach Limit',
      valOld: this.state.valNew,
      beforeIs:''
    });
    setTimeout(() => this.setState({valNew: this.state.valOld, beforeIs:'num'}), 1000);
  }

  handleNumbers(num) {
    if (this.state.valNew==="Reach Limit") {
      this.setState({beforeIs:''})
    }else {
        if(this.state.valNew.length > 21) {
             this.reachMax();
        }else {
            if(this.state.beforeIs==='num'&&num.target.value!=='0'){
               this.setState({
               valNew:  /([x/+‑]0)$/.test(this.state.formula) ?this.state.valNew : (this.state.formula+num.target.value),
               formula: /([x/+‑]0)$/.test(this.state.formula) ?this.state.formula : (this.state.formula +num.target.value),
               beforeIs:'num'
               });
             }
             if(this.state.beforeIs==='num'&&num.target.value==='0'){
              this.setState({
              valNew:  num.target.value,
              formula: /([x/+‑]0)$/.test(this.state.formula) ?this.state.formula : (this.state.formula +num.target.value),
              beforeIs:'num'
              });
            }
            if(this.state.beforeIs==='operator'){
                  this.setState({
                  valNew: num.target.value,
                  formula: this.state.formula+num.target.value,
                  beforeIs:'num' 
                 });
             }
           if(this.state.beforeIs===''&&num.target.value!=='0'){
               this.setState({
               valNew: num.target.value,
               formula: num.target.value,
               beforeIs:'num'
               });
             }
             if(this.state.beforeIs===''&&num.target.value==='0'){
              this.setState({
              valNew: '0',
              formula: '',
              beforeIs:'num'
              });
            }
    }
  }}
   
  handleOperators(num) { 
    if (this.state.valNew!=="Reach Limit") {
      if(this.state.beforeIs===''){
        this.setState({
        valNew: '0',
        formula: '',
        beforeIs:''
        });
      }
      if(this.state.beforeIs==='num'){
        this.setState({
        valNew: num.target.value,
        formula: this.state.formula+num.target.value,
        beforeIs:'operator'
        });
      }
      if(this.state.beforeIs==='operator'){
        this.setState({
        valNew: this.state.valNew,
        formula: this.state.formula,
        beforeIs:'operator'
        });
      }
    }
  }
  
  handleEvaluate(){
    if (this.state.valNew!=="Reach Limit") {
      let expression = this.state.formula;
      if (this.state.beforeIs==='operator') { expression = expression.slice(0, -1);}
        expression = expression.replace(/x/g, "*").replace(/‑/g, "-");
        let answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
        this.setState({
        valNew: answer.toString(),
        formula: expression.replace(/\*/g, '⋅').replace(/-/g, '‑') + '=' + answer,
        beforeIs: ''
      });
    }
  }
    
  handleDecimal() {
    if (this.state.valNew!=="Reach Limit") {
      if (this.state.valNew.length > 21) {
        this.reachMax();
      } else {

        if(this.state.beforeIs==='num'){
          this.setState({
            valNew: '.',
            formula: this.state.formula + '.',
            beforeIs:'decimal'
          }); 
        }
        if(this.state.beforeIs==='decimal'){
          this.setState({
            valNew: '.',
            formula: this.state.formula,
            beforeIs:'decimal'
          }); 
        } 
        if(this.state.beforeIs==='operator'){
          this.setState({
            valNew: this.state.valNew,
            formula: this.state.formula,
            beforeIs:'operator'
          }); 
        }
        if(this.state.beforeIs===''){
          this.setState({
            valNew: '0.',
            formula: '0.',
            beforeIs:'decimal'
          }); 
        }
      }
  }}

  render() {
    return (
      <div className="App">
        <div className='App-body'>
          <div className="formulaScreen">{this.state.formula} </div>
          <div className="outputScreen"> {this.state.valNew} </div>
          <div>
        <button value='AC' onClick={this.cleanUp} className='jumbo' style={{background: '#F55A3B'}}>AC</button>
        <button value='/'  onClick={this.handleOperators} style={{background: '#F49753'}}>/</button>
        <button value='x'  onClick={this.handleOperators} style={{background: '#F49753'}}>x</button>
        <button value='7'  onClick={this.handleNumbers} >7</button>
        <button value='8'  onClick={this.handleNumbers} >8</button>
        <button value='9'  onClick={this.handleNumbers} >9</button>
        <button value='‑'  onClick={this.handleOperators} style={{background: '#F49753'}}>-</button>
        <button value='4'  onClick={this.handleNumbers} >4</button>
        <button value='5'  onClick={this.handleNumbers} >5</button>
        <button value='6'  onClick={this.handleNumbers} >6</button>
        <button value='+'  onClick={this.handleOperators} style={{background: '#F49753'}}>+</button>
        <button value='1'  onClick={this.handleNumbers} >1</button>
        <button value='2'  onClick={this.handleNumbers} >2</button>
        <button value='3'  onClick={this.handleNumbers} >3</button>
        <button value='0'  onClick={this.handleNumbers} className='jumbo'>0</button>
        <button value='.'  onClick={this.handleDecimal} >.</button>
        <button value='='  onClick={this.handleEvaluate} style={{
        background: '#8E42C3',
        position: 'absolute',
        height: 130,
        bottom: 5
      }}>=</button>
      </div>
        </div>
      </div>
    )
  }
};



export default App;
