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
  const initialData = [
    JSON.parse(decodeURIComponent(query as string)) as ClusterObjectType,
  ];

  const [data, setData] = useState<DataObjectType>({
    iter: 0,
    k: 1,
    clusters: initialData,
  });

  const runClusterIteration = () => {
    axios
      .post("/api/clusterData", data)
      .then((res) => {
        if (res.status === 200) setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setNumberOfClusters = (e: any) => {
    const k = e.target.value;
    if (k && !isNaN(k)) setData({ ...data, k: Number(k) });
    else console.error("Not a valid number of clusters");
  };

  const refreshProcess = () => {
    setData({ iter: 0, k: 1, clusters: initialData });
  };

  return (
    <div>
      <Sidebar
        handleIteration={runClusterIteration}
        numberOfClusters={setNumberOfClusters}
        refreshProcess={refreshProcess}
      >
        <GraphContainer data={data} />
      </Sidebar>
    </div>
  );
};

export default Graph;
