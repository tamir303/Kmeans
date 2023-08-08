/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import { ClusterObjectType, DataObjectType } from "@/app/types";

const Axis: React.FC<DataObjectType> = ({ iter, k, clusters }) => {
  const numOfPoints = clusters.flatMap((cluster) => cluster.values).length;
  const generateChartData = (clusters: ClusterObjectType[]) => {
    const colors = ['red', 'green', 'blue', 'orange', 'purple']; // Add more colors if needed

    /** @todo: Issue, values are undefined after running first itermation */
    const chartData = clusters.map((cluster, index) => {
      const { fields, values } = cluster;
      return {
        data: values.map((valueArray) => {
          return Object.fromEntries(fields.map((field, index) => [field, valueArray[index]]));
        }),
        type: 'scatter',
        xKey: `${fields[0]}`,
        yKey: `${fields[1]}`,
        marker: {
          type: 'circle',
          fill: colors[index % colors.length]
        }
      }
    });

    return chartData;
  };

  const axisRef = useRef(null);
  const [options, setOptions] = useState({
    title: { text: `Points: ${numOfPoints} Groups: ${clusters.length} Iterations: ${iter}` },
    series: generateChartData(clusters)
  });

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <AgChartsReact ref={axisRef} options={options} />
    </div>
  );
};

export default Axis;
