/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import { DataObjectType } from "@/app/types";

const Axis: React.FC<DataObjectType> = ({ iter, k, clusters }) => {
  const axisRef = useRef(null);
  const numOfPoints = clusters.flatMap((cluster) => cluster.values).length;
  const [scatterSeriesConfigs, setScatterSeriesConfigs] = useState<any[]>([]);
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"];

  console.log(clusters);

  useEffect(() => {
    // Map through clusters and create a scatter series config for each cluster
    const newScatterSeriesConfigs = clusters.map((cluster, index) => {
      const color = colors[index % colors.length]; // Pick a color from the array based on index

      const fieldNames = cluster.fields || []; // Get the field names for the current cluster

      // Extract the data (nested arrays) from the current cluster
      const data = cluster.values.map((input) => ({
        [fieldNames[0]]: parseFloat(input[0]), // Assuming the first element is X coordinate (you can adjust accordingly)
        [fieldNames[1]]: parseFloat(input[1]), // Assuming the second element is Y coordinate (you can adjust accordingly)
        color, // Use the color for this cluster
      }));

      return {
        type: "scatter",
        marker: {
          type: "circle",
          size: 12,
        },
        xKey: fieldNames[0],
        yKey: fieldNames[1],
        title: `Cluster ${index + 1} (${fieldNames.join(", ")})`, // Include field names in the series title
        data,
      };
    });

    setScatterSeriesConfigs(newScatterSeriesConfigs);
  }, [clusters]);

  const [options, setOptions] = useState({
    title: {
      text: `${numOfPoints} Inputs on Axis`,
    },
    subtitle: {
      text: "",
    },
    series: scatterSeriesConfigs,
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
