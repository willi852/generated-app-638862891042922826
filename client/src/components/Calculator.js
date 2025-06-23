import React, { useState } from 'react';
import axios from 'axios';
import '../styles/App.css';

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleButtonClick = (value) => {
    if (error) setError('');
    setInput(prev => prev + value);
  };

  const calculateResult = async () => {
    if (!input.trim()) {
      setError('Please enter an expression');
      return;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + '/api/calculate',
        { expression: input }
      );
      setResult(response.data.result.toString());
    } catch (err) {
      console.error('Error:', err);
      setError('Error calculating expression');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
    setError('');
  };

  const backspace = () => {
    setInput(prev => prev.slice(0, -1));
  };

  return (
    <div className="calculator">
      <div className="display">
        {error && <div className="error">{error}</div>}
        <div className="input">{input || '0'}</div>
        <div className="result">= {result || '0'}</div>
      </div>
      <div className="buttons">
        <button onClick={() => handleButtonClick('(')}>(</button>
        <button onClick={() => handleButtonClick(')')}>)</button>
        <button onClick={() => handleButtonClick('^')}>^</button>
        <button onClick={backspace}>←</button>
        <button onClick={clearInput}>AC</button>
        
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('/')}>/</button>
        <button onClick={() => handleButtonClick('sqrt(')}>√</button>
        
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('*')}>×</button>
        <button onClick={() => handleButtonClick('sin(')}>sin</button>
        
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('-')}>-</button>
        <button onClick={() => handleButtonClick('cos(')}>cos</button>
        
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={() => handleButtonClick('pi')}>π</button>
        <button onClick={() => handleButtonClick('+')}>+</button>
        <button onClick={() => handleButtonClick('tan(')}>tan</button>
        
        <button className="equals" onClick={calculateResult}>=</button>
      </div>
    </div>
  );
};

export default Calculator;