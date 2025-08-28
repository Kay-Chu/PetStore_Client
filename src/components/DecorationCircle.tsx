import React from "react";

interface DecorationCircleProps {
  size?: number;      // outer circle size in px
  color?: string;     // base color
  className?: string; // extra tailwind classes like positioning
}

export const DecorationCircle: React.FC<DecorationCircleProps> = ({
  size = 192, // default 48 * 4 = w-48
  color = "border-fire-bush-400",
  className = "",
}) => {
  const middle = size * 0.66;
  const inner = size * 0.33;

  return (
    <div
      className={`flex items-center justify-center rounded-full border-4 ${color} ${className} -z-9`}
      style={{ width: size, height: size, opacity: 0.2  }}
    >
      <div
        className={`flex items-center justify-center rounded-full border-4 ${color}  -z-9`}
        style={{ width: middle, height: middle, opacity: 0.5  }}
      >
        <div
          className={`rounded-full border-4 ${color}  -z-9`}
          style={{ width: inner, height: inner, opacity: 0.6  }}
        />
      </div>
    </div>
  );
};
