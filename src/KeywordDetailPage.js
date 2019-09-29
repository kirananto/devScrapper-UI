import React from "react";
import { axiosInstance } from "./App";
import { format } from "date-fns";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import noContent from "./assets/noContent.png";

const COLORS = ["#68A364", "#0088FE", "#FFBB28", "#FF8042"];

export class KeywordDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywordInfo: undefined,
      data: [
        { name: "Work Email", value: 333 },
        { name: "Personal Email", value: 100 }
      ]
    };
  }

  componentDidMount() {
    this.fetchKeywords();
    setInterval(this.fetchKeywords, 1000);
    axiosInstance
      .get(`/keywords/${this.props.keyword}/emails`)
      .then(async result => {
        const totalCount = result.data.length;
        const personalEmails = await result.data.filter(item => {
          return (
            item.email.includes("gmail") ||
            item.email.includes("yahoo") ||
            item.email.includes("outlook") ||
            item.email.includes("hotmail")
          );
        }).length;
        const workEmails = totalCount - personalEmails;
        this.setState({
          data: [
            { name: "Work Email", value: workEmails },
            { name: "Personal Email", value: personalEmails }
          ]
        });
      });
  }

  fetchKeywords = () => {
    axiosInstance.get(`/keywords/${this.props.keyword}`).then(result => {
      this.setState({ keywordInfo: result.data[0] });
    });
  };

  getCSVData = () => {
    axiosInstance.get(`/keywords/${this.props.keyword}/emails`).then(result => {
      console.log(result.data);
      let csvContent =
        "data:text/csv;charset=utf-8,Name,Email\n" +
        result.data.map(e => `${e.name},${e.email}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `${format(new Date(), `yyyy_MM_dd_HH_mm`)}${this.props.keyword}.csv`
      );
      document.body.appendChild(link); // Required for FF

      link.click(); // This will download the data file named "my_data.csv".
    });
  };
  render() {
    return this.state.keywordInfo ? (
      <div className="body-content">
        <div className="body-heading">
          {decodeURIComponent(this.props.keyword)}{" "}
          {this.state.keywordInfo.totalCompletedRepos ===
          this.state.keywordInfo.totalReposCount ? (
            <sup className="super-completed">Completed</sup>
          ) : (
            <sup className="super-in-progress">In Progress</sup>
          )}
          <button
            onClick={() => window.location.reload()}
            className="keyword_individual_firstline_item_button refresh_button"
          >
            Refresh
          </button>
        </div>
        <div className="keyword_main_container">
          <div className="keyword_individual">
            <div className="keyword_individual_firstline">
              <div className="keyword_individual_firstline_item">
                <div className="keyword_individual_firstline_item_title">
                  Total repos
                </div>
                <div className="keyword_individual_firstline_item_content">
                  {this.state.keywordInfo.totalReposCount}
                </div>
              </div>
              <div className="keyword_individual_firstline_item">
                <div className="keyword_individual_firstline_item_title">
                  Finished repos
                </div>
                <div className="keyword_individual_firstline_item_content">
                  {this.state.keywordInfo.totalCompletedRepos}
                </div>
              </div>
              <div className="keyword_individual_firstline_item">
                <div className="keyword_individual_firstline_item_title">
                  Total emails
                </div>
                <div className="keyword_individual_firstline_item_content">
                  {this.state.keywordInfo.totalEmailsCount}
                </div>
              </div>
              <div
                className="keyword_individual_firstline_item"
                style={{ gridColumn: "span 2" }}
              >
                <div className="keyword_individual_firstline_item_title">
                  Download emails list
                </div>
                <button
                  onClick={this.getCSVData}
                  className="keyword_individual_firstline_item_button"
                >
                  Download CSV
                </button>
              </div>
            </div>
          </div>
          <div className="keyword_individual" style={{ display: "grid" }}>
            Work email vs free email
            <PieChart
              style={{ justifySelf: "center" }}
              width={230}
              height={250}
            >
              <Pie
                data={this.state.data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {this.state.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </div>
    ) : (
      <div className="body-content">
        <img src={noContent} />
      </div>
    );
  }
}
