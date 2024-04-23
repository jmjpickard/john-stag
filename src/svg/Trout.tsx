import React from "react";

const TroutSVG: React.FC = () => {
  // Define the colors for the trout pixels
  const colors = [
    "transparent",
    "#B4D7E8",
    "#A4CADF",
    "#5390D9",
    "#5390D9",
    "#5390D9",
    "#A4CADF",
    "#B4D7E8",
    "transparent",
    "#5390D9",
    "#407DBE",
    "#407DBE",
    "#285DA1",
    "#285DA1",
    "#407DBE",
    "#407DBE",
    "transparent",
    "#407DBE",
    "#285DA1",
    "#285DA1",
    "#1B478C",
    "#1B478C",
    "#285DA1",
    "#407DBE",
  ];

  // Size of each pixel
  const pixelSize = 10;

  return (
    <svg
      width={`${pixelSize * 8}px`}
      height={`${pixelSize * 3}px`}
      viewBox="0 0 80 30"
    >
      {colors.map((color, i) => (
        <rect
          key={i}
          x={(i % 8) * pixelSize} // x position based on column
          y={Math.floor(i / 8) * pixelSize} // y position based on row
          width={pixelSize}
          height={pixelSize}
          fill={color}
        />
      ))}
    </svg>
  );
};

export default TroutSVG;
