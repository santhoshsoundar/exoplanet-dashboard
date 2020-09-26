import React, { useContext } from 'react'
import { scaleLinear, extent, format } from "d3"

import { DataContext } from '../App'
import Chart from './Chart'
import Axis from './Axis'
import Circles from "./Circles"

function ScatterPlot({ selectedX, selectedY }) {
    const { data } = useContext(DataContext)

    const chartDim = {
        height: 380,
        width: 760, 
        marginTop: 10,
        marginRight: 15,
        marginBottom: 60,
        marginLeft: 40,
    },
    xAccessor = d => d[selectedX],
    yAccessor = d => d[selectedY];
    
    const dimensions = {
        ...chartDim,
        canvasHeight: Math.max(chartDim.height - chartDim.marginTop - chartDim.marginBottom, 0),
        canvasWidth: Math.max(chartDim.width - chartDim.marginLeft - chartDim.marginRight, 0),
    }

    const addDomainPadding = (min, max, padding) => {
        const range = max - min
        return [min - (range * padding), max + (range * padding)]
    }
    const [minX, maxX] = extent(data, xAccessor)
    const [minY, maxY] = extent(data, yAccessor)
    const axisPadding = 0.05

    const xScale = scaleLinear()
        .domain(addDomainPadding(minX, maxX, axisPadding))
        .range([0, dimensions.canvasWidth])

    const yScale = scaleLinear()
        .domain(addDomainPadding(minY, maxY, axisPadding))
        .range([dimensions.canvasHeight, 0])

    const xAccessorScaled = d => xScale(xAccessor(d))
    const yAccessorScaled = d => yScale(yAccessor(d))

    return (
        <Chart dimensions={dimensions}>
            <Axis
                dimensions={dimensions}
                orientation="bottom"
                scale={xScale}
                label={selectedX}
                formatTick={format(".2s")} 
            />
            <Axis
                dimensions={dimensions}
                orientation="left"
                scale={yScale}
                label={selectedY}
                formatTick={format(".2s")} 
            />
            <Circles
                data={data}
                xAccessor={xAccessorScaled}
                yAccessor={yAccessorScaled}
                radius={5}
                color={"var(--accent-primary)"}
                opacity={0.4}
            />
        </Chart>
    );
}

export default ScatterPlot