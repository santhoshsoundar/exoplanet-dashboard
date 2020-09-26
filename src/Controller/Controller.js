import React, { useState, useEffect, useContext } from 'react'
import Select from 'react-select'

import { DataContext } from '../App'
import { LineSeperation } from '../HelperComponents/HelperComponents' 
import Histogram from '../ChartComponents/Histogram'
import styles from './Controller.module.css'

function Controller({ setSelectedX, setSelectedY }) {
    const [options, setOptions] = useState([])
    const [selectedXFeature, setSelectedXFeature] = useState('')
    const [selectedYFeature, setSelectedYFeature] = useState('')
    const { features } = useContext(DataContext)
    const convertFeatureToOption = d => ({"value" : d, "label" : d })

    useEffect(() => {
        if(features && options.length === 0){
            const options = features.map(convertFeatureToOption);
            setOptions(options);
            const initialX = options[4].value,
                initialY = options[1].value;
            setSelectedXFeature(initialX)
            setSelectedYFeature(initialY)
            setSelectedX(initialX)
            setSelectedY(initialY)
        }
    }, [features, options, setSelectedX, setSelectedY]);

    return (
        <div className={styles["Controller"]}>
            <div className={styles["Controller-content"]}>
                <p className={styles["Controller-label"]}>Select X Axis:</p>
                <Select 
                    options={options} 
                    value={convertFeatureToOption(selectedXFeature)}
                    menuPlacement="auto"
                    onChange={(selectedOption) => {
                        setSelectedXFeature(selectedOption.value);
                        setSelectedX(selectedOption.value)
                    }}
                />
                <div className={styles["Controller-distribution"]}> 
                    <Histogram xFeatureSelected={selectedXFeature} />
                </div>
            </div>
            <LineSeperation color={"var(--light-grey)"}/>
            <div className={styles["Controller-content"]}>
                <p className={styles["Controller-label"]}>Select Y Axis:</p>
                <Select 
                    options={options} 
                    value={convertFeatureToOption(selectedYFeature)}
                    menuPlacement="auto"
                    onChange={(selectedOption) => {
                        setSelectedYFeature(selectedOption.value);
                        setSelectedY(selectedOption.value)
                    }}
                />
                <div className={styles["Controller-distribution"]}> 
                    <Histogram xFeatureSelected={selectedYFeature} /> 
                </div>
            </div>
        </div>
    );
}

export default Controller