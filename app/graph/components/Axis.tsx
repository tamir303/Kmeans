/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

interface dataPoint {
  xVal: number;
  yVal: number;
}

interface AxisProps {
  data: dataPoint[];
  height: number;
  width: number;
}

const Axis: React.FC<AxisProps> = ({ data, height, width }) => {
  const axisRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    drawAxis();
  }, [data]);

  const drawAxis = () => {
    if (!axisRef.current) return;

    const svg = d3.select(axisRef.current);
    svg.selectAll("*").remove(); // Clear any existing elements (optional)

    // Set up margins and scales
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create X and Y scales without domain calculation
    const xScale = d3.scaleLinear().range([0, innerWidth]);
    const yScale = d3.scaleLinear().range([innerHeight, 0]);

    // Create X and Y axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .call(yAxis);
  };

  return <svg ref={axisRef} width={width} height={height} />;
};

export default Axis;
