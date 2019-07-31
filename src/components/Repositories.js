import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import LoadingIndicator from "./LoadingIndicator";
import { isUserSignedIn, getFile } from "blockstack";

export const sampleRepos = [
  {
    name: "react-github",
    owner: { username: "Pau1fitz (github.com)" },
    url: "https://github.com/Pau1fitz/react-github",
    description: "A Github client built with React / GraphQL",
    languages: [{ name: "javascript" }],
    stargazers: { totalCount: 43 },
    forkCount: 5
  }
];
class Repo extends Component {
  state = {
    repos: [],
    filteredRepos: [],
    filtered: false,
    loading: true
  };

  componentDidMount() {
    if (isUserSignedIn) {
      getFile("repositories").then(repos => {
        if (repos) {
          this.setState({
            repos
          });
        } else {
          this.setState({
            repos: sampleRepos
          });
        }
        this.setState({ loading: false });
      });
    }
  }

  searchRepos = e => {
    const repos = this.state.repos.filter(repo => {
      if (repo.name.indexOf(e.target.value) > -1) {
        return repo;
      } else {
        return null;
      }
    });

    this.setState({
      filteredRepos: repos,
      filtered: true
    });
  };

  render() {
    const { repos, filteredRepos, filtered, loading } = this.state;

    const visibleRepos = filtered ? filteredRepos : repos;

    const repositories = !loading ? (
      visibleRepos.map((repo, i) => {
        return (
          <RepoCard key={i}>
            <RepoLink href={repo.url}>{repo.name}</RepoLink>
            <RepoDescription>{repo.description}</RepoDescription>
            <InfoContainer>
              <Circle />
              <RepoDetails>
                {repo.languages && repo.languages[0] && repo.languages[0].name
                  ? repo.languages[0].name
                  : null}{" "}
                <Icon className="fa fa-star" aria-hidden="true" />{" "}
                {repo.stargazers.totalCount}{" "}
                <Icon className="fa fa-code-fork" aria-hidden="true" />{" "}
                {repo.forkCount}
              </RepoDetails>
              <Date>{moment(repo.updatedAt).fromNow()}</Date>
            </InfoContainer>
          </RepoCard>
        );
      })
    ) : (
      <LoadingIndicator />
    );

    return (
      <div>
        {repos.length > 0 && (
          <SearchContainer>
            <SearchBox
              type="text"
              onChange={this.searchRepos}
              placeholder="Search repositories..."
            />
          </SearchContainer>
        )}
        {repositories}
      </div>
    );
  }
}

const RepoCard = styled.div`
  border-bottom: 1px #d1d5da solid;
  padding: 16px;
  margin-bottom: 16px;
`;

const SearchContainer = styled.div`
  border-bottom: 1px solid #d1d5da;
  padding-bottom: 16px;
`;

const SearchBox = styled.input`
  min-height: 34px;
  width: 300px;
  font-size: 14px;
  padding: 6px 8px;
  background-color: #fff;
  background-repeat: no-repeat;
  background-position: right 8px center;
  border: 1px solid #d1d5da;
  border-radius: 3px;
  outline: none;
  box-shadow: inset 0 1px 2px rgba(27, 31, 35, 0.075);
`;

const Date = styled.p`
  font-size: 12px;
  color: #586069;
  margin-left: 10px;
  margin-bottom: 0;
`;

const InfoContainer = styled.div`
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

const RepoDescription = styled.p`
  font-size: 14px;
  color: #586069;
  margin: 4px 0 10px 0;
`;

const RepoLink = styled.a`
  font-weight: 600;
  color: #0366d6;
  cursor: pointer;
  font-size: 20px;
`;

const RepoDetails = styled.span`
  color: #586069;
  font-size: 12px;
  margin-bottom: 0;
`;

const Icon = styled.i`
  margin-left: 16px;
`;

export default Repo;
