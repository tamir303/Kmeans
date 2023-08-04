"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import { DataObjectType } from "@/app/types";
import { useCallback } from "react";
import Axis from "./Axis";

interface GraphContainerProps {
  data: DataObjectType;
  witdh: number;
  height: number;
}

const GraphContainer: React.FC<GraphContainerProps> = ({
  data,
  witdh,
  height,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        width: "85%",
        left: "20rem",
        height: "100%",
        border: "1px solid #1a202c",
        backgroundColor: "#e0e0e0",
      }}
    >
      <Axis iter={data.iter} k={data.k} clusters={data.clusters} />
    </div>
  );
};

export default GraphContainer;
