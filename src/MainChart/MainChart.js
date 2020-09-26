import React from 'react'

import ScatterPlot from '../ChartComponents/ScatterPlot'
import styles from './MainChart.module.css'

function MainChart({ selectedX, selectedY }) {
    return (
        <div className={styles["MainChart"]}>
            <div className={styles["MainChart-header"]}>{`${selectedX} vs ${selectedY}`}</div>
            <ScatterPlot selectedX={selectedX} selectedY={selectedY}/>
        </div>
    );
}

export default MainChart