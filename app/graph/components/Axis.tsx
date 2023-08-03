/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useCallback, useRef } from "react";
import { AgChartsReact } from "ag-charts-react";
import { DataObjectType } from "@/app/types";

const Axis: React.FC<DataObjectType> = ({ iter, k, clusters }) => {
  const axisRef = useRef(null);
  const values = clusters?.flatMap((cluster) => cluster.values) || []
  const fields = clusters ? clusters[0].fields : []

  const createInputObject = (fields: string[], values: string[]) => {
    const res: { [key: string]: string } = {};
    fields.forEach((field, index) => {
      res[field] = values[index];
    });
    return res;
  };

  const [options, setOptions] = useState({
    title: {
      text: `${values.length} Inputs on Axis`,
    },
    subtitle: {
      text: "",
    },
    data: values.map((valueArray) => createInputObject(fields, valueArray)),
    series: [
      {
        type: "scatter",
        xKey: `${fields[0]}`,
        yKey: `${fields[1]}`,
        title: "Info",
        marker: {
          shape: "circle",
          size: 20,
          fill: "#ff0000",
          stroke: "#ffffff",
        },
      },
    ],
    axes: [
      {
        type: "number",
        position: "bottom",
        gridStyle: [
          {
            stroke: "rgba(219, 219, 219, 1)",
            lineDash: [4, 2],
          },
        ],
      },
      {
        type: "number",
        position: "left",
        gridStyle: [
          {
            stroke: "rgba(219, 219, 219, 1)",
            lineDash: [4, 2],
          },
        ],
      },
    ],
  });

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <AgChartsReact ref={axisRef} options={options} />
    </div>
  );
};

export default Axis;
