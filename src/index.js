import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './public-path';

function render(props) {
  const { container } = props
  console.log(props, 'react app render function');
  ReactDOM.render(<App data={props} />, container ? container.querySelector('#root') : document.getElementById('root'));
}

function storeTest(props) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`---------ReactApp--------- [onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    );
  // props.setGlobalState &&
  //   props.setGlobalState({
  //     ignore: props.name,
  //     user: {
  //       name: props.name,
  //     },
  //   });
}

if(!window.__POWERED_BY_QIANKUN__){
  render({container: null});
}
export async function bootstrap(){

}
export async function mount(props) {
  storeTest(props);
  render(props)
}
export async function unmount(props){
  const { container } = props

  ReactDOM.unmountComponentAtNode(
    container 
    ? container.querySelector('#root')
    : document.getElementById('root')
  );
}