// src/Calculator.js

import React, { Component } from 'react';
import Button from './Button';
import Display from './Display';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0',
      operator: null,
      waitingForOperand: false,
      storedValue: null,
    };
  }

  handleNumberClick = (number) => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(number),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(number) : displayValue + number,
      });
    }
  };

  handleOperatorClick = (operator) => {
    const { displayValue, storedValue, operator: previousOperator } = this.state;

    if (previousOperator && !waitingForOperand) {
      this.setState({
        displayValue: String(this.calculate(storedValue, displayValue, previousOperator)),
        waitingForOperand: true,
        operator,
      });
    } else {
      this.setState({
        storedValue: displayValue,
        waitingForOperand: true,
        operator,
      });
    }
  };

  calculate = (a, b, operator) => {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        if (b === 0) {
          alert('Division by zero is not allowed.');
          return '0';
        }
        return a / b;
      default:
        return b;
    }
  };

  handleEqualsClick = () => {
    const { displayValue, storedValue, operator } = this.state;

    if (operator && !waitingForOperand) {
      this.setState({
        displayValue: String(this.calculate(storedValue, displayValue, operator)),
        waitingForOperand: true,
        operator: null,
        storedValue: null,
      });
    }
  };

  handleClearClick = () => {
    this.setState({
      displayValue: '0',
      operator: null,
      waitingForOperand: false,
      storedValue: null,
    });
  };

  render() {
    const { displayValue } = this.state;

    return (
      <div className="calculator">
        <Display value={displayValue} />
        <div className="buttons">
          <div className="row">
            <Button onClick={this.handleClearClick}>C</Button>
            <Button onClick={() => this.handleOperatorClick('/')}>/</Button>
            <Button onClick={() => this.handleOperatorClick('*')}>*</Button>
          </div>
          <div className="row">
            <Button onClick={() => this.handleNumberClick(7)}>7</Button>
            <Button onClick={() => this.handleNumberClick(8)}>8</Button>
            <Button onClick={() => this.handleNumberClick(9)}>9</Button>
            <Button onClick={() => this.handleOperatorClick('-')}>-</Button>
          </div>
          <div className="row">
            <Button onClick={() => this.handleNumberClick(4)}>4</Button>
            <Button onClick={() => this.handleNumberClick(5)}>5</Button>
            <Button onClick={() => this.handleNumberClick(6)}>6</Button>
            <Button onClick={() => this.handleOperatorClick('+')}>+</Button>
          </div>
          <div className="row">
            <Button onClick={() => this.handleNumberClick(1)}>1</Button>
            <Button onClick={() => this.handleNumberClick(2)}>2</Button>
            <Button onClick={() => this.handleNumberClick(3)}>3</Button>
            <Button onClick={this.handleEqualsClick}>=</Button>
          </div>
          <div className="row">
            <Button onClick={() => this.handleNumberClick(0)}>0</Button>
            <Button onClick={() => this.handleNumberClick('.')}>.</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Calculator;
