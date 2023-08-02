"use client";

import { useSearchParams } from "next/navigation";
import GraphContainer from "./components/Graph";
import Sidebar from "./components/Sidebar";
import { useState } from "react";
import { DataObjectType } from "../types";

const Graph = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  const [data, setData] = useState<DataObjectType>({
    iter: 0,
    k: 0,
    clusters: query ? JSON.parse(decodeURIComponent(query)) : null,
  });

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
