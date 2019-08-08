import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

const Issues = () => {
  const [issueList] = useState([]);

  const issues = issueList
    ? issueList.map(issue => (
        <IssueCard key={issue.publishedAt}>
          <Icon className="fa fa-exclamation-circle" aria-hidden="true" />
          <IssueDetails>
            <NameWithOwner>{issue.repository.nameWithOwner}</NameWithOwner>{" "}
            <span>{issue.node.title} </span>
            <IssueInfo>
              opened on {`${moment(issue.publishedAt).format("ddd MMM YYYY")}`}{" "}
              by {`${issue.author.login}`}
            </IssueInfo>
          </IssueDetails>
        </IssueCard>
      ))
    : [];

  const openIssues = issueList
    ? issueList.filter(issue => {
        return issue.state === "OPEN";
      }).length
    : null;

  const closedIssues = issueList
    ? issueList.filter(issue => {
        return issue.state === "CLOSED";
      }).length
    : null;

  return (
    <div>
      <IssueCountBG>
        Issues across all git repos will be shown here in the future
        <IssueCount>{openIssues ? `${openIssues} Open` : null}</IssueCount>
        <IssueCount>
          {closedIssues ? `${closedIssues} Closed` : null}
        </IssueCount>
      </IssueCountBG>
      <IssueContainer>{issues}</IssueContainer>
    </div>
  );
};

const IssueContainer = styled.section`
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #e1e4e8;
  border-right: 1px solid #e1e4e8;
  border-top: 1px solid #e1e4e8;
`;

const IssueCountBG = styled.div`
  width: 980px;
  margin: 0 auto;
  background: #f6f8fa;
  border-top: 1px solid #e1e4e8;
  border-left: 1px solid #e1e4e8;
  border-right: 1px solid #e1e4e8;
  border-radius: 3px 3px 0 0;
  padding-top: 13px;
  padding-bottom: 13px;
  padding-left: 16px;
`;
const IssueCount = styled.span`
  font-size: 14px;
  :last-child {
    margin-left: 10px;
  }
`;

const IssueCard = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e4e8;
`;

const IssueInfo = styled.p`
  font-size: 12px;
  color: #586069;
`;

const IssueDetails = styled.div`
  padding: 8px;
`;

const Icon = styled.i`
  color: #28a745;
  font-size: 20px;
  padding-left: 16px;
  padding-top: 8px;
`;

const NameWithOwner = styled.span`
  color: #586069;
  padding-right: 4px;
  font-size: 16px;
`;

export default Issues;
