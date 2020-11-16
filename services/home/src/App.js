import React, { Component } from 'react'
import logo from './logo.svg';
import './App.css';
import fetch from 'node-fetch'

class App extends Component {
  constructor(props) {
    super(props);
    if(!this.state) this.state = {}
    this.state.serverTime = ""
    this.state.clientIp = props.clientIp ? props.clientIp : null
    this.state.clientGeo = props.clientGeo ? props.clientGeo : null
    this.state.error = null
  }

  callAPI() {
      var apiBaseUrl = window.location.protocol + "//" + window.location.hostname + ":5000";
      fetch("/time")
          .then(res => res.json())
          .then(res => this.setState({ serverTime: res.time }))
          .catch(function(error) {
            console.log(error);
          })
      fetch(apiBaseUrl + "/geo/my")
          .then(res => res.json())
          .then(res => {
            this.setState({ clientIp: res.ip })
            this.setState({ clientGeo: res })
          })
          .catch(function(error) {
            //this.setState({ error: error })
            console.log(error);
          })
  }

  componentDidMount() {
      this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p className="App-intro">
            { this.state.error ? this.state.error : "" }
            Time: {this.state.serverTime} <br />
            Client IP: {this.state.clientIp}<br />
            { this.state.clientGeo ? this.state.clientGeo.hasError ?
              <div>Error: {this.state.clientGeo.error}</div>
              :
              <div>Country: {this.state.clientGeo.country}, {this.state.clientGeo.stateprov}, {this.state.clientGeo.city}<br />{this.state.clientGeo.timezone}</div> : <div>No geo info</div> }
          </p>
        </header>
      </div>
    );
  }
}

export default App;
