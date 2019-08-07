import React, { Component } from "react";
import styled from "styled-components";
import moment from "moment";
import LoadingIndicator from "./LoadingIndicator";
import { isUserSignedIn, getFile } from "blockstack";
import { sampleRepos } from "./Repositories";

class Stars extends Component {
  state = {
    starredRepositories: [],
    filteredRepos: [],
    filtered: false,
    loading: true
  };

  componentDidMount() {
    if (isUserSignedIn()) {
      getFile("starred-repositories").then(starredRepositories => {
        if (starredRepositories) {
          this.setState({
            starredRepositories
          });
        } else {
          this.setState({
            starredRepositories: sampleRepos
          });
        }
        this.setState({ loading: false });
      });
    }
  }

  searchRepos = e => {
    const repos = this.state.starredRepositories.filter(repo => {
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
    const {
      starredRepositories,
      filteredRepos,
      filtered,
      loading
    } = this.state;

    const visibleRepos = filtered ? filteredRepos : starredRepositories;

    const repositories = !loading ? (
      visibleRepos.map((star, i) => {
        return (
          <StarCard key={star.url}>
            <Link href={star.url}>
              <Name>{star.owner.username}</Name> / <Owner>{star.name}</Owner>
            </Link>
            <StarDescription>{star.description}</StarDescription>
            <InfoContainer>
              <Circle />
              <Language>
                {star.languages[0] &&
                star.languages[0] &&
                star.languages[0].name
                  ? star.languages[0].name
                  : null}
              </Language>
              <Icon className="fa fa-star" aria-hidden="true" />
              <Count>{star.stargazers.totalCount.toLocaleString()}</Count>
              <Icon className="fa fa-code-fork" aria-hidden="true" />
              <Count>{star.forkCount.toLocaleString()}</Count>
              <Date>{moment(star.updatedAt).fromNow()}</Date>
            </InfoContainer>
          </StarCard>
        );
      })
    ) : (
      <LoadingIndicator />
    );

    return (
      <section>
        {starredRepositories.length > 0 && (
          <SearchContainer>
            <SearchBox
              type="text"
              onChange={this.searchRepos}
              placeholder="Search starred repositories..."
            />
          </SearchContainer>
        )}
        {repositories}
      </section>
    );
  }
}

const StarCard = styled.div`
  border-bottom: 1px #d1d5da solid;
  padding: 16px;
  margin-bottom: 16px;
`;

const StarDescription = styled.p`
  font-size: 14px;
  color: #586069;
  margin: 4px 0 8px 0;
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

const Language = styled.span`
  margin-right: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  color: #586069;
  font-size: 12px;
`;

const Icon = styled.i`
  margin-right: 3px;
  color: #586069;
`;

const Date = styled.p`
  font-size: 12px;
  color: #586069;
  margin-bottom: 0;
`;

const Count = styled.p`
  font-size: 12px;
  color: #586069;
  margin-right: 12px;
  margin-bottom: 0;
`;

const Name = styled.span`
  font-size: 20px;
`;

const Owner = styled.span`
  font-weight: 600;
  font-size: 20px;
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

const Link = styled.a`
  color: #0566d9;
`;

export default Stars;
