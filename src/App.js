import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import axios from "axios";
import SignaturePad from "react-signature-canvas";
import "reactjs-popup/dist/index.css";
import "./App.css";
import "./sigCanvas.css";

function App() {
  const [imageURL, setImageURL] = useState(null);

  const sigCanvas = useRef({});

  const clear = () => sigCanvas.current.clear();

  const save = () => {
    setImageURL(sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"));
    axios.post("http://localhost:3010/api/sigimg", {
      imageURL: imageURL,
    });
  };

  return (
    <div className="App">
      <h1>Signature Pad Example</h1>
      <Popup
        modal
        trigger={<button>Open Signature Pad</button>}
        closeOnDocumentClick={false}
      >
        {(close) => (
          <>
            <SignaturePad
              ref={sigCanvas}
              canvasProps={{
                className: "signatureCanvas",
              }}
            />
            <button onClick={save}>Save</button>
            <button onClick={clear}>Clear</button>
            <button onClick={close}>Close</button>
          </>
        )}
      </Popup>
      <br />
      <br />

      {imageURL ? (
        <img
          src={imageURL}
          alt="my signature"
          style={{
            display: "block",
            margin: "0 auto",
            border: "1px solid black",
            width: "150px",
          }}
        />
      ) : null}
    </div>
  );
}

export default App;
