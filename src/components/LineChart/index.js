import React from  "react";
// third party libraries
import {Line} from "react-chartjs-2";
import "chartjs-plugin-lineheight-annotation"


const LineChart = ({data}) => {
  return (
    <Line data={data}
      options={{
        responsive:true,
        lineHeightAnnotation: {
          always: false,
          hover:true,
          color: "white",
          noDash: true
        }
      }}
    />
  )
}

export default LineChart