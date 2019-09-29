import React from "react";
import { axiosInstance } from "./App";
import { KeywordsBox } from "./KeywordsBox";
export class KeywordsSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: "",
      keywords: []
    };
  }

  componentDidMount() {
    this.fetchKeywords();
    setInterval(this.fetchKeywords, 1000);
  }

  fetchKeywords = () => {
    axiosInstance.get("/keywords").then(result => {
      this.setState({ keywords: result.data });
    });
  };
  render() {
    return (
      <div className="body-content">
        <div className="body-heading">Keywords</div>
        <div className="items-container">
          {this.state.keywords.map(item => (
            <KeywordsBox key={item.keyword} item={item} />
          ))}
        </div>
      </div>
    );
  }
}
