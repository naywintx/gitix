import React, { Component } from "react";
import styled from "styled-components";
import LoadingIndicator from "./LoadingIndicator";
import { isUserSignedIn, getFile, putFile } from "blockstack";
import { sampleRepos } from "./Repositories";

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
      getFile("repositories", { decrypt: false }).then(repos => {
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
    getFile("repositories", { decrypt: false }).then(repos => {
      let repoList;
      if (!repos) {
        repoList = [];
      } else {
        repoList = JSON.parse(repos);
      }
      repoList.push({
        name: this.state.name,
        url: this.state.url,
        description: this.state.description
      });
      putFile("repositories", JSON.stringify(repoList), {
        encrypt: false
      }).then(r => {
        this.setState({ updating: false });
      });
    });
  }

  render() {
    const { loading, updating } = this.state;

    return (
      <div>
        <Title>Add new repository</Title>
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

const Label = styled.p`
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

const RepoDescription = styled.textarea`
  font-size: 14px;
  color: #586069;
`;

const RepoUrl = styled.input`
  color: #586069;
  font-size: 14px;
`;

const RepoName = styled.input`
  color: #586069;
  font-size: 14px;
`;

const RepoDetails = styled.span`
  color: #586069;
  font-size: 12px;
  margin-bottom: 0;
`;

const ButtonIcon = styled.i``;

const Icon = styled.i`
  margin-left: 16px;
`;

export default AddRepo;
