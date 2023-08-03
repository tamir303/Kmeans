const Sidebar = ({
  children,
  handleIteration,
}: {
  children: React.ReactNode;
  handleIteration: () => void;
}) => {
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
          <button
            onClick={handleIteration}
            style={{
              blockSize: "40px",
              fontSize: "25px",
              margin: "12px",
            }}
          >
            B1
          </button>
          <button
            style={{
              blockSize: "40px",
              fontSize: "25px",
              margin: "12px",
            }}
          >
            B2
          </button>
        </nav>
      </div>
      <main style={{ paddingLeft: "20px", height: "100%" }}>{children}</main>
    </div>
  );
};

export default Sidebar;
