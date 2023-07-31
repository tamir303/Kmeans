import { AiOutlinePlusCircle } from "react-icons/ai";

interface InputProps {
  x: number;
  y: number;
  color?: string;
}

const Input: React.FC<InputProps> = ({ x, y, color }) => {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        transform: `translate(${x}px, ${y}px)`,
        width: "1rem",
        height: "1rem",
        borderRadius: "50%",
        padding: "20px",
      }}
    >
      <AiOutlinePlusCircle size={40} color={!color ? "#000000" : "#f56565"}  />
    </div>
  );
};

export default Input;
