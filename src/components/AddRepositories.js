import React, { Component } from "react";
import styled from "styled-components";
import LoadingIndicator from "./LoadingIndicator";
import { sampleRepos } from "./Repositories";
import {
  putNewRepository,
  getGithubRepos,
  isUserSignedIn,
  loadUserData
} from "../lib/blockstack";

class AddRepo extends Component {
  state = {
    repos: [],
    loading: true,
    name: "",
    url: "",
    description: "",
    updating: false
  };

  componentDidMount() {
    if (isUserSignedIn()) {
      getGithubRepos(loadUserData().profile).then(repos => {
        console.log(repos);
        if (repos) {
          this.setState({
            repos
          });
        }
        this.setState({ loading: false });
      });
    }
  }

  handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  handleChangeUrl(event) {
    this.setState({ url: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  saveRepository() {
    this.setState({ updating: true });
    const newRepo = {
      name: this.state.name,
      url: this.state.url,
      description: this.state.description
    };

    putNewRepository(newRepo).then(r => {
      this.setState({ updating: false });
    });
  }

  render() {
    const { loading, updating, repos } = this.state;

    return (
      <div>
        <Title>Add repository</Title>
        {repos.length > 0 && (
          <>
            Repo from your github acount:{" "}
            <select
              onChange={e => {
                const repoUrl = e.target.value;
                const r = this.state.repos.find(r => r.url === repoUrl);
                if (r) {
                  this.setState({
                    name: r.name,
                    url: r.url,
                    description: r.description || ""
                  });
                } else {
                  this.setState({
                    name: "",
                    url: "",
                    description: ""
                  });
                }
              }}
            >
              <option value=""></option>
              {repos.map(r => {
                return (
                  <option value={r.url} key={r.url}>
                    {r.name}
                  </option>
                );
              })}
            </select>
          </>
        )}
        <h2>
        Repository Details
        </h2>
        <Label>Name</Label>
        <RepoName
          value={this.state.name}
          onChange={e => this.handleChangeName(e)}
        />
        <Label>Git link</Label>
        <RepoUrl
          value={this.state.url}
          onChange={e => this.handleChangeUrl(e)}
        />
        <Label>Git description</Label>
        <RepoDescription
          value={this.state.description}
          onChange={e => this.handleChangeDescription(e)}
        />
        <br />
        <SaveButton onClick={() => this.saveRepository()}>
          <ButtonIcon className="fa fa-save" /> Save
        </SaveButton>
        {(loading || updating) && <LoadingIndicator />}
      </div>
    );
  }
}

const SaveButton = styled.a`
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

const Title = styled.p`
  color: #24292e;
  font-size: 16px;
  margin-bottom: 8px;
`;


const Label = styled.p`
  font-size: 12px;
  color: #586069;
  margin-left: 10px;
  margin-bottom: 0;
`;


const RepoDescription = styled.textarea`
  font-size: 14px;
  color: #586069;
  width: 460px;
`;

const RepoUrl = styled.input`
  color: #586069;
  font-size: 14px;
  width: 460px;
`;

const RepoName = styled.input`
  color: #586069;
  font-size: 14px;
  width: 460px;
`;

const ButtonIcon = styled.i``;

const Icon = styled.i`
  margin-left: 16px;
`;

export default AddRepo;
