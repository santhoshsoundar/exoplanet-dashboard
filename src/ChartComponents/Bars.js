import React from "react"
import { max } from 'd3'

const Bars = ({ data, xAccessor, yAccessor, widthAccessor, heightAccessor, color, ...props }) => (
  <React.Fragment>
    {data.map((d, i) => (
        <rect {...props}
            key={i}
            x={xAccessor(d)}
            y={yAccessor(d)}
            width={max([widthAccessor(d), 0])}
            height={max([heightAccessor(d), 0])}
            fill={color}
        />
    ))}
  </React.Fragment>
)

export default Bars