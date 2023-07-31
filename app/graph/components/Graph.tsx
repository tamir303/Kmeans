"use client";

import toPixels from "@/app/actions/toPixels";
/* eslint-disable react-hooks/rules-of-hooks */
import { dataStructType } from "@/app/types";
import { useCallback } from "react";
import Input from "./Input";
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
        position: "absolute",
        width: "100%",
        height: "100%",
        border: "1px solid #1a202c",
        backgroundColor: "#e0e0e0",
      }}
    >
      {
        <Axis
          data={Array.from({ length: 4 }, (_, index) => index).map((index) => {
            return {
              xVal: (getMaxFields()[0] / 4) * (index + 1),
              yVal: (getMaxFields()[1] / 4) * (index + 1),
            };
          })}
          width={getMaxFields()[0]}
          height={getMaxFields()[1]}
        />
      }

      {data.values.map((valuesArray, index) => {
        const { x: pixelX, y: pixelY } = toPixels(
          valuesArray.map((s) => Number(s)),
          getMaxFields(),
          witdh,
          height
        );
        return <Input x={pixelX} y={pixelY} key={index} />;
      })}
    </div>
  );
};

export default GraphContainer;
