import React, { useRef } from "react"
import * as d3 from 'd3'

function Axis ({ orientation, scale, formatTick, dimensions, label, ...props }) {
  const axisByOrientation = {
    bottom: "axisBottom",
    left: "axisLeft",
  }
  const axisGenerator = d3[axisByOrientation[orientation]]()
    .scale(scale)
    .tickFormat(formatTick)

  const ref = useRef()
  if (ref.current) {
    d3.select(ref.current)
      .transition()
      .call(axisGenerator)
  }

  const computeAxisLabelOffset = (position, dimensions) => {
    return position === "bottom" ? `translate(${dimensions.canvasWidth / 2}px, ${dimensions.marginBottom / 1.85}px)`
        : position === "left" ? `translate(${-dimensions.marginLeft / 1.25}px, ${dimensions.canvasHeight / 2.5}px) rotate(-90deg)`
        : null
  }

  return (
        <g {...props}
          ref={ref}
          transform={
              orientation === "bottom"
              ? `translate(0, ${dimensions.canvasHeight})`
              : null
          }
        >
            {label && (
                <text
                    style={{
                        transform: computeAxisLabelOffset(orientation, dimensions),
                        fill: "black",
                    }}
                >
                    { label }
                </text>
            )}  
        </g>
  )
}

export default Axis