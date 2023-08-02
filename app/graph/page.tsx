"use client";

import { useSearchParams } from "next/navigation";
import GraphContainer from "./components/Graph";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { ClusterObjectType, DataObjectType } from "../types";

const Graph = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const initialData = (query ? JSON.parse(decodeURIComponent(query)) : null) as ClusterObjectType

  const createClusterObject = (fields: string[], values: string[]) => {
    const res: { [key: string]: string } = {}
    fields.forEach((field, index) => {
      res[field] = values[index];
    });
    return res;
  }

  const [data, setData] = useState<DataObjectType>({
    iter: 0,
    k: 0,
    clusers
  })

  const graphWidth = 600;
  const graphHeight = 400;

  return (
    <div>
      <Sidebar>
        <GraphContainer data={data} witdh={graphWidth} height={graphHeight} />
      </Sidebar>
    </div>
  );
};

export default Graph;
