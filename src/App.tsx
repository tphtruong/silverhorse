import React from 'react';
import './App.css';
import ItemsContainer from './containers/ItemsContainer'
// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (<>
    <div className="App">
      <ItemsContainer />
    </div>
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
    />
  </>);
}

export default App;
