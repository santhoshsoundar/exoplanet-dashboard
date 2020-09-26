import React, { useContext } from "react"
import { scaleLinear, histogram, extent, max, format } from "d3"

import { DataContext } from '../App' 
import Chart from './Chart'
import Bars from "./Bars"
import Axis from "./Axis"

function Histogram ({ xFeatureSelected }) {
  const { data } = useContext(DataContext)

  const chartDim = {
    height: 100,
    width: 380,
    marginTop: 5,
    marginRight: 15,
    marginBottom: 20,
    marginLeft: 10,
  },
  xAccessor = d => d[xFeatureSelected],
  numberOfThresholds = 10;

  const dimensions = {
    ...chartDim,
    canvasHeight: Math.max(chartDim.height - chartDim.marginTop - chartDim.marginBottom, 0),
    canvasWidth: Math.max(chartDim.width - chartDim.marginLeft - chartDim.marginRight, 0),
  }

  const xScale = scaleLinear()
    .domain(extent(data, xAccessor))
    .range([0, dimensions.canvasWidth])
    .nice(numberOfThresholds)

  const binsGenerator = histogram()
    .domain(xScale.domain())
    .value(xAccessor)
    .thresholds(xScale.ticks(numberOfThresholds))

  const bins = binsGenerator(data)

  const yAccessor = d => d.length
  const yScale = scaleLinear()
    .domain([0, max(bins, yAccessor)])
    .range([dimensions.canvasHeight, 0])

  const barPadding = 1
  const xAccessorScaled = d => xScale(d.x0) + barPadding
  const yAccessorScaled = d => yScale(yAccessor(d))
  const widthAccessorScaled = d => xScale(d.x1) - xScale(d.x0) - barPadding
  const heightAccessorScaled = d => dimensions.canvasHeight - yScale(yAccessor(d))

  return (
    <Chart dimensions={dimensions}>
        <Axis
            dimensions={dimensions}
            orientation="bottom"
            scale={xScale}
            formatTick={format(".2s")} 
        />
        <Bars
            data={bins}
            dimensions={dimensions}
            xAccessor={xAccessorScaled}
            yAccessor={yAccessorScaled}
            widthAccessor={widthAccessorScaled}
            heightAccessor={heightAccessorScaled}
            color={"var(--accent-primary)"}/>
    </Chart>
  )
}

export default Histogram