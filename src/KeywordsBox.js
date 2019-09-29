import React from "react";
import email from "./assets/find_email.svg";
import github from "./assets/github.svg";
import { formatDistance} from 'date-fns'
export const KeywordsBox = ({ item }) => (
  <div className="item">
    <div
      class={`percentage c100 p${((item.totalCompletedRepos / item.totalReposCount) * 100).toFixed(0)} small green`}
    >
      <span>
        {((item.totalCompletedRepos / item.totalReposCount) * 100).toFixed(0)}%
      </span>
      <div class="slice">
        <div class="bar"></div>
        <div class="fill"></div>
      </div>
    </div>
    <div className="items-content-container">
      <div className="items-content-container-title">
        {" "}
        {item.keyword.split("_").join(", ")}
      </div>
      <div
        style={{
          fontSize: "16px",
          marginTop: "0.5rem",
          textAlign: "left",
          color: "#767676"
        }}
      >
        <img
          alt="email"
          src={email}
          height="16px"
          style={{ verticalAlign: "text-bottom" }}
        />{" "}
        <span style={{ marginLeft: "0.2rem", marginRight: "1rem" }}>
          {item.totalEmailsCount}
        </span>
        <img
          alt="github"
          src={github}
          height="16px"
          style={{ verticalAlign: "text-bottom" }}
        />{" "}
        <span style={{ marginLeft: "0.2rem", marginRight: "1rem" }}>
          {item.totalCompletedRepos} of {item.totalReposCount}
        </span>
      </div>
      <div style={{
          fontSize: "16px",
          marginTop: "0.5rem",
          textAlign: "left",
          color: "#767676"
        }}>
          Spawned {formatDistance(new Date(item.time), new Date())} ago
      </div>
    </div>
    <div onClick={() => {
        window.location.replace(`/${item.keyword}`)
    }} className="keywordBoxViewMore">
        View more
    </div>
  </div>
);
