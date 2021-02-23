
import React, { Component } from 'react';
import { graphWorld } from './map';

class App extends Component {
  async componentDidMount() {
     graphWorld()
     }
     render(){
  return (
      <div id="chartdiv" style={{ width: "100%", height: "600px" }}></div>
  );
}
}
export default App;
