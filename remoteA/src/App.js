import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  const increment = () => setCount(prev => prev + step);
  const decrement = () => setCount(prev => prev - step);
  const reset = () => setCount(0);

  return (
    <div className="remotea-app">
      <header className="remotea-header">
        <h2>🚀 Remote A 应用</h2>
        <p>计数器组件 - 独立部署的微前端应用</p>
      </header>

      <div className="counter-container">
        <div className="counter-display">
          <div className="count-value">{count}</div>
          <div className="count-label">当前计数</div>
        </div>

        <div className="controls">
          <div className="step-control">
            <label>步长:</label>
            <select 
              value={step} 
              onChange={(e) => setStep(Number(e.target.value))}
              className="step-select"
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={100}>100</option>
            </select>
          </div>

          <div className="button-group">
            <button onClick={decrement} className="btn btn-decrease">
              ➖ 减少
            </button>
            <button onClick={reset} className="btn btn-reset">
              🔄 重置
            </button>
            <button onClick={increment} className="btn btn-increase">
              ➕ 增加
            </button>
          </div>
        </div>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">当前步长:</span>
            <span className="stat-value">{step}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">正负状态:</span>
            <span className={`stat-value ${count >= 0 ? 'positive' : 'negative'}`}>
              {count >= 0 ? '正值' : '负值'}
            </span>
          </div>
          <div className="stat-item">
            <span className="stat-label">是否为零:</span>
            <span className={`stat-value ${count === 0 ? 'zero' : 'not-zero'}`}>
              {count === 0 ? '是' : '否'}
            </span>
          </div>
        </div>

        <div className="history">
          <h3>操作历史</h3>
          <div className="history-item">
            初始值: 0
          </div>
          {count !== 0 && (
            <div className="history-item">
              当前操作: {count > 0 ? '+' : ''}{count} (步长: {step})
            </div>
          )}
        </div>
      </div>

      <footer className="remotea-footer">
        <p>✨ Remote A 是一个独立的微前端应用，通过 Module Federation 暴露给主应用使用</p>
      </footer>
    </div>
  );
}

export default App;