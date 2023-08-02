"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import { dataStructType } from "@/app/types";
import { useCallback } from "react";
import Axis from "./Axis";

interface GraphContainerProps {
  data: dataStructType;
  witdh: number;
  height: number;
}

const GraphContainer: React.FC<GraphContainerProps> = ({
  data,
  witdh,
  height,
}) => {
  const findMaxFields = (data: dataStructType) => {
    const maxFields = Array.from(
      { length: data.fields.length },
      (_, index) => index
    ).map((index) => {
      return Math.max(
        ...data.values.map((valuesArray) =>
          Number(valuesArray[index].valueOf())
        )
      );
    });

    return maxFields;
  };

  const getMaxFields = useCallback(() => {
    return findMaxFields(data);
  }, [data]);

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
      <Axis fields={data.fields} values={data.values} />
    </div>
  );
};

export default GraphContainer;
