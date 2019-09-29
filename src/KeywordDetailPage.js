import React from "react";
import { axiosInstance } from "./App";
import { format } from "date-fns";
export class KeywordDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywordInfo: undefined
    };
  }

  componentDidMount() {
    this.fetchKeywords();
    setInterval(this.fetchKeywords, 1000);
  }

  fetchKeywords = () => {
    axiosInstance.get(`/keywords/${this.props.keyword}`).then(result => {
      this.setState({ keywordInfo: result.data[0] });
    });
  };

  getCSVData = () => {
    axiosInstance.get(`/keywords/${this.props.keyword}/emails`).then(result => {
      console.log(result.data)
      let csvContent = "data:text/csv;charset=utf-8,Name,Email\n" + result.data.map(e => `${e.name},${e.email}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${format(new Date(), `yyyy_MM_dd_HH_mm`)}${this.props.keyword}.csv`);
      document.body.appendChild(link); // Required for FF

      link.click(); // This will download the data file named "my_data.csv".
    });
  }
  render() {
    return (
      <div className="body-content">
        <div className="body-heading">{this.props.keyword}</div>
        {this.state.keywordInfo ? (
          <div className="keyword_main_container">
            <div className="keyword_individual">
              <div className="keyword_individual_firstline">
              <div className="keyword_individual_firstline_item">
                <div className="keyword_individual_firstline_item_title">Total repos</div>
                <div className="keyword_individual_firstline_item_content">{this.state.keywordInfo.totalReposCount}</div>
                </div>
                <div className="keyword_individual_firstline_item">
                <div className="keyword_individual_firstline_item_title">Finished repos</div>
                <div  className="keyword_individual_firstline_item_content">{this.state.keywordInfo.totalCompletedRepos}</div>
                </div>
                <div className="keyword_individual_firstline_item">
                <div className="keyword_individual_firstline_item_title">Total emails</div>
                <div  className="keyword_individual_firstline_item_content">{this.state.keywordInfo.totalEmailsCount}</div>
                </div>
                <div className="keyword_individual_firstline_item" style={{ gridColumn: 'span 2'}}>
                <div className="keyword_individual_firstline_item_title">Download emails list</div>
                <button onClick={this.getCSVData}  className="keyword_individual_firstline_item_button">Download CSV</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div> no info </div>
        )}
      </div>
    );
  }
}
