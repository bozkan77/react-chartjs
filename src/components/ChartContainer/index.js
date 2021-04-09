import React,{useState} from "react";
//custom components
import LineChart from "../LineChart";
import BarChart from "./BarChart";

const ChartContainer = () => {

  const [lineData, setLineData] = useState({
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

  const [barData, setBarData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July"],
    datasets: [
      {
        label: "App Coding",
        backgroundColor:"rgba(255,0,255,0.75)",
        data: [65,59,80,81,56,60,40]
      }
    ]
  })

  const setGradientColor = (canvas, color) => {
    const ctx = canvas.getContext("2d");
    console.log(ctx);
    const gradient = ctx.createLinearGradient(0,0,0, 400);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.95, "rgba(133,255,144,0.85)");
    return gradient;
  }

  const getLineChartData = (canvas) => {
   if(lineData.datasets) {
     let colors = ["rgba(255,0,255,0.75)", "rgba(0,255,0, 0.75)"]
     lineData.datasets.forEach((set, i) => {
        set.backgroundColor = setGradientColor(canvas, colors[i]);
        set.borderColor = "white";
        set.borderWidth =  1;
     })
   }
    return lineData
  }

  // const getBarChartData = (canvas) => {
  //   if(barData.datasets) {
  //     let colors = ["rgba(255,0,255,0.75)", "rgba(0,255,0, 0.75)"]
  //     barData.datasets.forEach((set, i) => {
  //        set.backgroundColor = setGradientColor(canvas, colors[i]);
  //        set.borderColor = "white";
  //        set.borderWidth =  1;
  //     })
  //   }
  //    return barData
  //  }

  return(
    <div className="chart-container">
      <h3>Chart Samples</h3>
      <div className="chart-column-1">
        <div className="chart-row">
          <LineChart data={getLineChartData}/>
        </div>
        <div className="chart-row">
          <BarChart data={barData}/>
        </div>
      </div>
    </div>
  )
}

export default ChartContainer;