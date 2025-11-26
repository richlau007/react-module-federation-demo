import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 Module Federation', completed: false },
    { id: 2, text: '创建微前端应用', completed: true },
    { id: 3, text: '部署到 GitHub Pages', completed: false }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length
  };

  return (
    <div className="remoteb-app">
      <header className="remoteb-header">
        <h2>📝 Remote B 应用</h2>
        <p>待办事项管理 - 独立部署的微前端应用</p>
      </header>

      <div className="todo-container">
        <div className="todo-input-section">
          <div className="input-group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
              placeholder="添加新的待办事项..."
              className="todo-input"
            />
            <button onClick={addTodo} className="add-btn">
              ➕ 添加
            </button>
          </div>
        </div>

        <div className="filter-section">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              全部 ({stats.total})
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              进行中 ({stats.active})
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              已完成 ({stats.completed})
            </button>
          </div>
          {stats.completed > 0 && (
            <button onClick={clearCompleted} className="clear-btn">
              🗑️ 清除已完成
            </button>
          )}
        </div>

        <div className="todo-list">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📋</div>
              <p>暂无待办事项</p>
              <span className="empty-hint">
                {filter === 'active' ? '没有进行中的任务' : 
                 filter === 'completed' ? '没有已完成的任务' : 
                 '添加一个新任务开始吧！'}
              </span>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <div key={todo.id} className="todo-item">
                <div className="todo-content">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                    className="todo-checkbox"
                  />
                  <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                    {todo.text}
                  </span>
                </div>
                <button 
                  onClick={() => deleteTodo(todo.id)}
                  className="delete-btn"
                  aria-label="删除任务"
                >
                  ❌
                </button>
              </div>
            ))
          )}
        </div>

        <div className="progress-section">
          <div className="progress-header">
            <h3>完成进度</h3>
            <span className="progress-text">
              {stats.total === 0 ? '0%' : 
               Math.round((stats.completed / stats.total) * 100)}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{
                width: stats.total === 0 ? '0%' : 
                       `${(stats.completed / stats.total) * 100}%`
              }}
            />
          </div>
          <div className="progress-stats">
            <span>总计: {stats.total}</span>
            <span>进行中: {stats.active}</span>
            <span>已完成: {stats.completed}</span>
          </div>
        </div>
      </div>

      <footer className="remoteb-footer">
        <p>✨ Remote B 是一个独立的微前端应用，提供待办事项管理功能</p>
        <p>通过 Module Federation 技术暴露给主应用使用</p>
      </footer>
    </div>
  );
}

export default App;