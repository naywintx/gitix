import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

const PullRequests = () => {
  const [pullRequests] = useState([]);
  const prs = pullRequests
    ? pullRequests.map(pr => (
        <PRCard key={pr.publishedAt}>
          <Icon className="fa fa-code-fork" aria-hidden="true" />
          <PRDetailsContainer>
            <NameWithOwner>{pr.repository.nameWithOwner}</NameWithOwner>{" "}
            <span>{pr.title} </span>
            <PRDetails>
              opened on {`${moment(pr.publishedAt).format("ddd MMM YYYY")}`} by{" "}
              {`${pr.author.login}`}
            </PRDetails>
          </PRDetailsContainer>
        </PRCard>
      ))
    : [];

  const openPRs = pullRequests
    ? pullRequests.filter(pr => {
        return pr.state === "OPEN";
      }).length
    : null;

  const closedPRs = pullRequests
    ? pullRequests.filter(pr => {
        return pr.state === "CLOSED";
      }).length
    : null;

  return (
    <div>
      <PRCountBG>
        Pull requests will be shown here in the future
        <PRCount>{openPRs ? `${openPRs} Open` : null}</PRCount>
        <PRCount>{openPRs ? `${closedPRs} Closed` : null}</PRCount>
      </PRCountBG>
      <PRContainer>{prs}</PRContainer>
    </div>
  );
};

const PRContainer = styled.section`
  width: 980px;
  margin: 0 auto;
  border-left: 1px solid #e1e4e8;
  border-right: 1px solid #e1e4e8;
  border-top: 1px solid #e1e4e8;
`;

const PRCountBG = styled.div`
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
const PRCount = styled.span`
  font-size: 14px;
  :last-child {
    margin-left: 10px;
  }
`;

const PRCard = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e4e8;
`;
const PRDetailsContainer = styled.div`
  padding: 8px;
`;
const PRDetails = styled.p`
  font-size: 12px;
  color: #586069;
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

export default PullRequests;
