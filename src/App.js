import React, { useEffect, useState } from "react";
import './App.css';
const Render = () => {
  // const stateRef = React.useRef([]);
  const [state, setState] = useState([]);
  const [output, setOutput] = useState('')

  const onClick = () => {
    setState([{ id: '0000001' }]);
  };
  const toParent = (e) => {
    if (window && window.parent) {
      e.preventDefault();
      window.parent.postMessage({ content: output }, 'http://localhost:4201');
    }
  };

  const onMessageReceivedFromIframe = React.useCallback(
    event => {
      // if (event.origin.startsWith('http://localhost:4201')) {
      if (event.data.app === 'vibeiq') {
        setState(event.data.content)
        console.log("FromParent---", event.data, state);
        // stateRef.current = event.data.content;
      }
    },
    [state]
  );

  useEffect(() => {
    window.addEventListener("message", onMessageReceivedFromIframe);
    return () => window.removeEventListener("message", onMessageReceivedFromIframe);
  }, [onMessageReceivedFromIframe]);

  const handleInputChange = (event) => {
    setOutput(event.target.value);
  }

  return (
    <div style={{paddingTop: 12}}>
      {state.map((rowData) =>
        <div key={rowData.id} className="row-data">
          <span>Id: {rowData?.id}</span>
          <span>Name: {rowData?.name}</span>
          <span>Option Name: {rowData?.optionName}</span>
          <span>Target Volume: {rowData?.targetVolume}</span>
        </div>
      )}

      {/* <p>{state}</p>
      <button onClick={onClick}>Click here</button>
      <p>{output || 'Input Value here'}</p>
      <input type="text" onChange={handleInputChange} />
      <button onClick={toParent}>To Parent</button> */}
    </div>
  )

};

function App() {

  return (
    <Render />
  );
}

export default App;
