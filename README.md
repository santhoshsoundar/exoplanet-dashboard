### ExoPlanet Data Explorer

##### Logic begind high level decisions in building the components and assumptions:
#### Data Loading
Loaded .csv data at the App component and computed dropdown options after load in an `async` function. Final data after being processed for type conversion is then made available for the rest of the component tree via Context Providers so it need not be passed along at multiple endpoints. 

#### Dropdowns for selecting numeric features
To qualify for a valid numeric feature, I assumed values are numeric or non-empty string type and used it as props for the dropdown. Selections state from the controller component is lifted up to be passed down to the main chart section.

#### Axis
Built axis that can be used for x and y positions for provided scales and this can be extended to include other scale types. Lets user define labels and set margins from parent component. 

#### Binned Histograms
Used Axis and Bars components to build out a histogram with locally defined chart dimentions, scales that were passed xAxis selection and Bars.

#### Scatterplot 
Used Axis and Circles components to build out a scatterplot with locally defined scales with padding for better visibility and chart dimentions that were passed to xAxis & yAxis selection with axis label. 

With more time, I would add the following features to have a better UX:
- Grid lines for scatterplot 
- Tooltips for scatterplot

#### To Run Locally:
`npm install`
`npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)'s CRA Template then cleaned to remove tests, serviceWorkers and misc. configurations to help assesment.