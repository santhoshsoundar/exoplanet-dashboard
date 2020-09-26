import React from 'react'

import styles from './HelperComponents.module.css'

export const Emoji = ({ symbol, label }) => (
    <span
        className={styles["Emoji"]}
        role="img"
        aria-label={label ? label : ""}
        aria-hidden={label ? "false" : "true"}
    >
        {symbol}
    </span>
);

export const LoadingMessage = ({ message }) => (
    <div className={styles["LoadingMessage"]}> 
        <Emoji symbol="⌛" label="loading" />
        <h5>{ message }</h5>
    </div>
)

export const LineSeperation = ({ color, strokeStyle='dashed' }) => (
    <div style={{
        borderLeftWidth: '1px',
        borderLeftStyle: strokeStyle,
        borderLeftColor: color
    }}></div>
)