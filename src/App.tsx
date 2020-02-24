import React from "react";
import "./App.css";
import LineChart from "./LineChart/LineChart";
import ResizeSVG from "./LineChart/ResizeSVG";

function App() {
  return (
    <div className="App" style={{ height: "500px", width: "100%" }}>
      <ResizeSVG>
        {(bounds, margin) => <LineChart bounds={bounds} margin={margin} />}
      </ResizeSVG>
    </div>
  );
}

export default App;
