import React, {useState} from "react";
import './App.css';
import {Line} from "react-chartjs-2";

function App() {
  const [data, setData] = useState({
    labels: ["1","2","3","4","5"],
    datasets : [
      {
        label: "App coding",
        backgroundColor:"rgba(255,0,255,0.75)",
        data: [4,5,1,10,32,2,12]
      },
      {
        label: "Subscriptions",
        backgroundColor:"rgba(0,255,0, 0.75)",
        data: [14,15,21,0,22,40,35]
      }
    ]
  });

  const setGradientColor = (canvas, color) => {
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0,0,0, 400);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.95, "rgba(133,255,144,0.85)");
    return gradient;
  }

  const getChartData = (canvas) => {
   if(data.datasets) {
     let colors = ["rgba(255,0,255,0.75)", "rgba(0,255,0, 0.75)"]
     data.datasets.forEach((set, i) => {
         set.backgroundColor = setGradientColor(canvas, colors[i]);
       set.borderColor = "white";
       set.borderWidth =  2;
     })
   }
    return data
  }
  return (
    <div className="App">
      <div className="chart-container">
        <h3>Chart Samples</h3>
        <Line 
          options={{
            responsive:true,
          }}
          data={getChartData}
        />
      </div>
    </div>
  );
}

export default App;
