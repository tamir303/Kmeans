"use client";

import { useSearchParams } from "next/navigation";
import GraphContainer from "./components/Graph";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { DataObjectType, ClusterObjectType } from "../types";
import axios from "axios";

const Graph = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [data, setData] = useState<DataObjectType>({
    iter: 0,
    k: 5,
    clusters: query
      ? [JSON.parse(decodeURIComponent(query)) as ClusterObjectType]
      : [],
  });

  const graphWidth = 600;
  const graphHeight = 400;

  const runClusterIteration = () => {
    axios
      .post("/api/clusterData", data)
      .then((res) => {
        console.log(res.data)
        if (res.status === 200) setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Sidebar handleIteration={runClusterIteration}>
        <GraphContainer data={data} witdh={graphWidth} height={graphHeight} />
      </Sidebar>
    </div>
  );
};

export default Graph;
