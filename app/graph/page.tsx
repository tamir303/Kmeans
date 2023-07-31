"use client";

import { useSearchParams } from "next/navigation";
import GraphContainer from "./components/Graph";

const Graph = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const data = query ? JSON.parse(decodeURIComponent(query)) : null;

  const graphWidth = 600;
  const graphHeight = 400;

  return (
    <div>
      <GraphContainer data={data} witdh={graphWidth} height={graphHeight} />
    </div>
  );
};

export default Graph;
