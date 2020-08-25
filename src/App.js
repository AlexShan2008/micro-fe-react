import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { Divider } from 'antd';
import { GlobalStyle } from "super-design";

import 'antd/dist/antd.min.css';
import './App.css';

import LibVersion from './components/LibVersion';
import HelloModal from './components/HelloModal';

import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));


const RouteExample = (props) => {
  return (
    // basename 必须与基座 base 保持一致 TODO: 可以封装一个组件来统一解决这个问题
    <Router basename={window.__POWERED_BY_QIANKUN__ ? '/react' : '/'}>
      <nav>
        <Link to="/">Home</Link>
        <Divider type="vertical" />
        <Link to="/about">About</Link>
      </nav>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Suspense>
    </Router>
  );
};

export default function App(props) {
  // const { BASE_STORE } = props.data
  return (
    <div className="app-main">

      <GlobalStyle />

      {/* <Badge /> */}
      {/* <Avatar /> */}
      <li>111</li>
      {/* <Button>Super Design</Button> */}

      
      <LibVersion />
      <HelloModal />
      <Divider />
      <RouteExample />

     <div>
      {/* <h3>Data from Parent App: <i>{BASE_STORE.title}</i></h3> */}
    </div>
    </div>
  );
}