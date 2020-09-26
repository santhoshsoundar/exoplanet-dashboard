import React from "react"

const Chart = ({ dimensions, children }) => (
    <svg width={dimensions.width} height={dimensions.height}>
      <g transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}>
        { children }
      </g>
    </svg>
)

export default Chart
