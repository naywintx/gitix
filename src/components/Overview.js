import React, { Component } from "react";
import styled from "styled-components";
import LoadingIndicator from "./LoadingIndicator";
import { isUserSignedIn, getFile } from "blockstack";
import { sampleRepos } from "./Repositories";

class Overview extends Component {
  state = { repositories: [] };
  componentDidMount() {
    if (isUserSignedIn) {
      getFile("repositories").then(repositories => {
        if (repositories) {
          this.setState({ repositories });
        } else {
          this.setState({ repositories: sampleRepos });
        }
      });
    }
  }

  render() {
    const { repositories } = this.state;

    const repos = repositories ? (
      repositories.map((repo, i) => {
        // Only show 6 repos
        if (i < 6) {
          return (
            <RepoCard key={repo.name}>
              <RepoLink>{repo.name}</RepoLink>
              <RepoDescription>{repo.description}</RepoDescription>
              <RepoInfoContainer>
                <Circle />
                <RepoDetails>
                  {repo.languages &&
                    repo.languages[0] &&
                    repo.languages[0].name &&
                    repo.languages[0].name}{" "}
                  <Icon className="fa fa-star" aria-hidden="true" />{" "}
                  {repo.stargazers.totalCount}{" "}
                  <Icon className="fa fa-code-fork" aria-hidden="true" />{" "}
                  {repo.forkCount}
                </RepoDetails>
              </RepoInfoContainer>
            </RepoCard>
          );
        } else {
          return null;
        }
      })
    ) : (
      <LoadingIndicator />
    );

    return (
      <div>
        {repos.length > 1 && (
          <OverviewTitle>Popular Repositories</OverviewTitle>
        )}
        <RepoContainer>{repos}</RepoContainer>

        <CalendarContainer>
          <div className="calendar" />
        </CalendarContainer>
      </div>
    );
  }
}

const RepoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const RepoCard = styled.div`
  border: 1px #d1d5da solid;
  padding: 16px;
  width: 362px;
  margin-bottom: 16px;
`;

const RepoDescription = styled.p`
  font-size: 12px;
  color: #586069;
  margin: 4px 0 10px 0;
`;

const RepoInfoContainer = styled.div`
  display: flex;
`;

const Circle = styled.div`
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #f1e05a;
  margin-right: 5px;
  top: 2px;
  position: relative;
`;

const OverviewTitle = styled.p`
  color: #24292e;
  font-size: 16px;
  margin-bottom: 8px;
`;

const RepoLink = styled.a`
  font-weight: 600;
  font-size: 14px;
  color: #0366d6;
  cursor: pointer;
`;

const RepoDetails = styled.p`
  color: #586069;
  font-size: 12px;
  margin: 0;
`;

const Icon = styled.i`
  margin-left: 16px;
`;

const CalendarContainer = styled.div`
  position: relative;
`;

export default Overview;
