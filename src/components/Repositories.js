import React, { Component } from "react";
import styled from "styled-components";
import LoadingIndicator from "./LoadingIndicator";
import {
  isUserSignedIn,
  getRepositories,
  deleteRepositories,
  deleteRepository
} from "../lib/blockstack";
import RepoCard from "./RepoCard";

export const sampleRepos = [
  {
    name: "react-github",
    owner: { username: "Example Pau1fitz (github.com)" },
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
    if (isUserSignedIn()) {
      getRepositories().then(repos => {
        if (repos) {
          this.setState({ repos });
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

  deleteRepo = repo => {
    deleteRepository(repo).then(() => {
      if (window) {
        window.location.href = window.location.origin;
      }
    });
  };

  render() {
    const { repos, filteredRepos, filtered, loading } = this.state;

    const visibleRepos = filtered ? filteredRepos : repos;

    const repositories = !loading ? (
      visibleRepos.map((repo, i) => {
        return (
          <RepoCard
            key={i}
            repo={repo}
            className="list"
            onDelete={this.deleteRepo}
          />
        );
      })
    ) : (
      <LoadingIndicator />
    );

    return (
      <div>
        <AddButton href={`${process.env.PUBLIC_URL}/#/repositories/add`}>
          <ButtonIcon className="fa fa-book" /> Add
        </AddButton>
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
        {repos.length > 0 && (
          <DeleteAllButton
            onClick={() => {
              deleteRepositories().then(() => {
                if (window) {
                  window.location.href = window.location.origin;
                }
              });
            }}
          >
            <ButtonIcon className="fa fa-book" /> Remove all repos from gitix
            profile
          </DeleteAllButton>
        )}
      </div>
    );
  }
}

const AddButton = styled.a`
  cursor: pointer;
  border-radius: 0.25em;
  color: white;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
  font-size: 12px;
  line-height: 20px;
  padding: 3px 10px;
  background-position: -1px -1px;
  background-repeat: repeat-x;
  background-size: 110% 110%;
  border: 1px solid rgba(27, 31, 35, 0.2);
  display: inline-block;
  font-weight: 600;
  position: relative;
  vertical-align: middle;
  white-space: nowrap;
  text-decoration: none;
  box-sizing: border-box;
  margin: 8px 0px;
  &:hover: {
    text-decoration: none;
  }
`;

const DeleteAllButton = styled.a`
  cursor: pointer;
  border-radius: 0.25em;
  color: white;
  background-color: #cb2431;
  background-image: linear-gradient(-180deg, #de4450, #cb2431 90%);
  font-size: 12px;
  line-height: 20px;
  padding: 3px 10px;
  background-position: -1px -1px;
  background-repeat: repeat-x;
  background-size: 110% 110%;
  border: 1px solid rgba(27, 31, 35, 0.2);
  display: inline-block;
  font-weight: 600;
  position: relative;
  vertical-align: middle;
  white-space: nowrap;
  text-decoration: none;
  box-sizing: border-box;
  margin: 8px 0px;
  &:hover: {
    text-decoration: none;
  }
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

const ButtonIcon = styled.i``;

export default Repo;
