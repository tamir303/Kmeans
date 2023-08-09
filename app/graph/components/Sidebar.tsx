"use client";

import { useState } from "react";

interface SidebarProps {
  children: React.ReactNode;
  handleIteration: () => void;
  numberOfClusters: (k: any) => void;
  refreshProcess: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  children,
  handleIteration,
  numberOfClusters,
  refreshProcess,
}) => {
  const [activeProcess, setActiveProcess] = useState<boolean>(false);
  const [clusterNum, setClusterNum] = useState<number>(1);

  const handleActiveProcess = () => {
    setActiveProcess(true);
    handleIteration();
  };

  const handleRefreshProcess = () => {
    setActiveProcess(false);
    setClusterNum(1);
    refreshProcess();
  };

  const handleNumberOfClusters = (e: any) => {
    numberOfClusters(e);
    setClusterNum(e.target.value);
  };

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          position: "fixed",
          top: 8,
          left: 0,
          zIndex: 40,
          width: "17rem",
          height: "100%",
          padding: "0 1.5rem",
          overflowY: "auto",
          backgroundColor: "#f0f0f5",
          borderRight: "1px solid #e5e7eb",
          paddingBottom: "1rem",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <nav
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <label htmlFor="NumOfClusters">Number of Clusters:</label>
          <input
            type="number"
            id="NumOfClusters"
            name="NumOfClusters"
            onChange={handleNumberOfClusters}
            disabled={activeProcess}
            min={1}
            max={10}
            value={clusterNum}
            style={{
              blockSize: "20px",
              fontSize: "20px",
              margin: "12px",
            }}
          />
          <button
            onClick={handleActiveProcess}
            style={{
              blockSize: "40px",
              fontSize: "25px",
              margin: "12px",
            }}
          >
            Next Iteration
          </button>
          <button
            disabled
            style={{
              blockSize: "40px",
              fontSize: "25px",
              margin: "12px",
            }}
          >
            Previous Iteration
          </button>
          <button
            onClick={handleRefreshProcess}
            style={{
              blockSize: "40px",
              fontSize: "25px",
              margin: "12px",
            }}
          >
            Refresh
          </button>
        </nav>
      </div>
      <main style={{ paddingLeft: "20px", height: "100%" }}>{children}</main>
    </div>
  );
};

export default Sidebar;
