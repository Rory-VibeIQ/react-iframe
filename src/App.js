import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
const Render = () => {
  const [state, setState] = useState("Initial State");
  const [output, setOutput] = useState('')

  const onClick = () => {
    setState("Clicked");
  };
  const toParent = (e) => {
    if (window && window.parent) {
      e.preventDefault();
      window.parent.postMessage({content: output}, 'http://localhost:4200');
    }
  };

  const onMessageReceivedFromIframe = React.useCallback(
    event => {
      console.log("FromParent---", state, '===', typeof(event.data), event.data);
      if (event.origin.startsWith('http://localhost:4200')) {
        setState(event.data.content)
      }
      window.removeEventListener("message", onMessageReceivedFromIframe);
    },
    [state]
  );

  useEffect(() => {
    window.addEventListener("message", onMessageReceivedFromIframe);
    return () => window.removeEventListener("message", onMessageReceivedFromIframe);
  }, [onMessageReceivedFromIframe]);

  // React.useEffect(() => {
  //   console.log("state =======", state);
  // }, [state]);

  const handleInputChange = (event) => {
    setOutput(event.target.value);
  }

  return (
    <div>
      <p>{state}</p>
      <button onClick={onClick}>Click here</button>
      <p>{output || 'Input Value here'}</p>
      <input type="text" onChange={handleInputChange} />
      <button onClick={toParent}>To Parent</button>
    </div>
  )
  
};

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Render />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

    </div>
  );
}

export default App;
