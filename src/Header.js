
import React from "react";
import logo from "./logo.png";
import { axiosInstance } from "./App";
export class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          textInput: ""
        };
      }
    
      handleTextInput = event => {
        this.setState({ textInput: event.target.value });
      };
    
      handleExecution = () => {
        if (this.state.textInput !== "") {
          axiosInstance
            .post("/keywords", { keywords: this.state.textInput })
            .then(result => {
              this.setState({ textInput: "" });
              console.log("success");
            });
        }
      };
    render () {
        return (<header className="App-header">
        <img alt="devscrapper" onClick={() =>  window.location.replace('/')} src={logo} style={{ marginBottom: '1rem', cursor:'pointer'}}/>
        <div className="search_box">
          <input
          placeholder="Enter keywords to mine for"
            type="text"
            className="search_input"
            value={this.state.textInput}
            onChange={this.handleTextInput}
          />
          <button className="search_button" onClick={this.handleExecution}>
            SEARCH
          </button>
        </div>
      </header>)
    }
}