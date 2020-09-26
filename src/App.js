import React, { useState, useEffect, createContext } from 'react'
import { csv } from 'd3'

import Controller from './Controller/Controller'
import MainChart from './MainChart/MainChart'
import { Emoji, LoadingMessage } from './HelperComponents/HelperComponents'
import styles from './App.module.css'

export  const DataContext = createContext([])

function App() {
  const [data, setData] = useState([])
  const [features, setFeatures] = useState([])
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const [selectedX, setSelectedX] = useState('')
  const [selectedY, setSelectedY] = useState('')

  useEffect(() => {
      async function dataFetch() {
          const t1 = performance.now();
          const data = await csv(`${process.env.PUBLIC_URL || ""}/phl_hec_all_confirmed.csv`);
          const numericFeatures = await Object.entries(data[0])
            .filter(([, value]) => (!isNaN(value) && value !== ''))
            .map(([key, ]) => key) 
          setFeatures(numericFeatures)
          if(data && data.length > 0){
              setIsDataLoaded(true);
          }
          await data.forEach((d) => {
            numericFeatures.forEach(col => {
              d[col] = +d[col];
            })
          });
          setData(data)
          const t2 = performance.now();
          console.log(`Time taken to load & prepare data: ${(t2-t1)/1000} secs`);
      }
      dataFetch();
  }, [])

  return (
    <DataContext.Provider value={{ data, features }}>
      <div className={styles["App"]}>
        <header className={styles["App-header"]}>
          <Emoji symbol="🪐" label="planet"/>Exoplanet Data Explorer
        </header>
        <section className={styles["App-controller"]}>
          {!isDataLoaded && <LoadingMessage message="loading data..."/>}
          {isDataLoaded &&  <Controller setSelectedX={setSelectedX} setSelectedY={setSelectedY}/>}
        </section>
        <section>
          {!isDataLoaded && <LoadingMessage message="loading data..."/>}
          {isDataLoaded && <MainChart selectedX={selectedX} selectedY={selectedY}/>}
        </section>
      </div>
    </DataContext.Provider>
  );
}

export default App;
