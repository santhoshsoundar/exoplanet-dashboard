import React from "react"

const Circles = ({ data, xAccessor, yAccessor, radius, color, opacity }) => (
  <React.Fragment>
    {data.map((d, i) => (
      <circle
        key={i}
        cx={xAccessor(d)}
        cy={yAccessor(d)}
        r={radius}
        fill={color}
        opacity={opacity}
      />
    ))}
  </React.Fragment>
)

export default Circles