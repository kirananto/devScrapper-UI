import React from "react";
import axios from "axios";
import "./App.css";
import "./circle.css";
import { Header } from "./Header";
import { KeywordsSection } from "./KeywordsSection";
import { KeywordDetailPage } from "./KeywordDetailPage";
const host = "http://localhost:3241";
export const axiosInstance = axios.create({
  baseURL: host
});
class App extends React.Component {
  constructor(props){
    super(props)
    const url = window.location.pathname
    console.log('u',url)
    this.state = {
      path: url.split('/').length === 2 ? url.split('/')[1] : url.split('/')[0]
    }
  }

  render() {
    return (
      <div className="App">
        <Header/>
        {this.state.path === '' ? <KeywordsSection/> :  <KeywordDetailPage keyword={this.state.path}/> }
      </div>
    );
  }
}

export default App;
