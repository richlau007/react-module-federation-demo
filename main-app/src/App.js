import React, { useState, Suspense } from 'react';
import './App.css';

// 动态导入远程组件
const RemoteAApp = React.lazy(() => import('remoteA/App'));
const RemoteBApp = React.lazy(() => import('remoteB/App'));

function App() {
  const [activeApp, setActiveApp] = useState('main');

  const renderContent = () => {
    switch(activeApp) {
      case 'remoteA':
        return (
          <Suspense fallback={<div className="loading">Loading Remote A...</div>}>
            <RemoteAApp />
          </Suspense>
        );
      case 'remoteB':
        return (
          <Suspense fallback={<div className="loading">Loading Remote B...</div>}>
            <RemoteBApp />
          </Suspense>
        );
      default:
        return <MainContent />;
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>React Module Federation Demo</h1>
        <p>主应用 - 支持多个微前端子应用</p>
      </header>

      <nav className="nav">
        <button 
          className={activeApp === 'main' ? 'active' : ''}
          onClick={() => setActiveApp('main')}
        >
          主应用
        </button>
        <button 
          className={activeApp === 'remoteA' ? 'active' : ''}
          onClick={() => setActiveApp('remoteA')}
        >
          Remote A 应用
        </button>
        <button 
          className={activeApp === 'remoteB' ? 'active' : ''}
          onClick={() => setActiveApp('remoteB')}
        >
          Remote B 应用
        </button>
      </nav>

      <main className="content">
        {renderContent()}
      </main>
    </div>
  );
}

function MainContent() {
  return (
    <div className="app-section">
      <h2 className="app-title">主应用内容</h2>
      <p>这是主应用的内容区域。</p>
      <div className="feature-grid">
        <div className="feature-card">
          <h3>🚀 模块联邦</h3>
          <p>使用Webpack 5的Module Federation实现微前端架构</p>
        </div>
        <div className="feature-card">
          <h3>📦 独立部署</h3>
          <p>各个子应用可以独立开发、测试和部署</p>
        </div>
        <div className="feature-card">
          <h3>🔄 动态加载</h3>
          <p>运行时动态加载远程组件，无需重新构建</p>
        </div>
        <div className="feature-card">
          <h3>🎨 样式隔离</h3>
          <p>各个应用之间样式相互隔离，避免冲突</p>
        </div>
      </div>
      <div className="demo-section">
        <h3>使用说明</h3>
        <ol>
          <li>点击上方按钮切换不同的应用</li>
          <li>Remote A: 一个简单的计数器应用</li>
          <li>Remote B: 一个待办事项应用</li>
        </ol>
      </div>
    </div>
  );
}

export default App;