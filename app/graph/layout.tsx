import Sidebar from "./components/Sidebar";

export default async function GraphLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <div style={{ height: "100%" }}>
        {children}
      </div>
    </Sidebar>
  );
}
