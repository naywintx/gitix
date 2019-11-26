import React, { Component } from "react";
import styled from "styled-components";
import LoadingIndicator from "./LoadingIndicator";
import RepoCard from "./RepoCard";
import {
  getRepositories,
  putRepositories,
  isUserSignedIn,
  getGithubRepos
} from "../lib/blockstack";

class Overview extends Component {
  state = { repositories: [], githubRepos: [] };
  componentDidMount() {
    if (isUserSignedIn()) {
      getRepositories().then(repositories => {
        if (repositories) {
          this.setState({ repositories });
        } else {
          //const user = loadUserData();
          //this.addGithubRepos(user.profile);
        }
      });
    }
  }

  addGithubRepos(profile) {
    getGithubRepos(profile).then(repositories => {
      if (repositories) {
        this.setState({ repositories });
        putRepositories(repositories);
      }
    });
  }

  render() {
    const { repositories } = this.state;

    const repos = repositories ? (
      repositories.map((repo, i) => {
        // Only show 6 repos
        if (i < 6) {
          return <RepoCard key={repo.name} repo={repo} className="card" />;
        } else {
          return null;
        }
      })
    ) : (
      <LoadingIndicator />
    );

    return (
      <div>
        <OverviewTitle>Popular Repositories</OverviewTitle>
        {repos.length > 0 && <RepoContainer>{repos}</RepoContainer>}
        {repos.length === 0 && (
          <a href={`${process.env.PUBLIC_URL}/#/repositories/add`}>
            Add your first repo
          </a>
        )}
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

const OverviewTitle = styled.p`
  color: #24292e;
  font-size: 16px;
  margin-bottom: 8px;
`;

const CalendarContainer = styled.div`
  position: relative;
`;

export default Overview;
