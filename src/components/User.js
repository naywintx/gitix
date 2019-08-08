import React, { Component } from "react";
import styled from "styled-components";
import LoadingIndicator from "./LoadingIndicator";
import {
  isUserSignedIn,
  getFile,
  lookupProfile,
  putFile,
  loadUserData
} from "blockstack";
import { sampleRepos } from "./Repositories";
import Profile from "./Profile";

class User extends Component {
  state = {
    repositories: [],
    user: {},
    loading: true,
    loadingFollowing: true,
    updating: false,
    isFollowingUser: false
  };

  componentDidMount() {
    if (isUserSignedIn()) {
      lookupProfile(this.props.match.params.user).then(user => {
        this.setState({ user });
        getFile("following").then(f => {
          let following;
          if (f) {
            following = JSON.parse(f);
          } else {
            following = [];
          }
          const followingUserList = following.filter(
            u => u.username === this.props.match.params.user
          );
          this.setState({
            loadingFollowing: false,
            isFollowingUser: followingUserList.length > 0
          });
        });
        getFile("repositories", {
          decrypt: false,
          username: this.props.match.params.user
        })
          .then(repositories => {
            if (repositories) {
              this.setState({ repositories: JSON.parse(repositories) });
            } else {
              this.setState({ repositories: sampleRepos });
            }
            this.setState({ loading: false });
          })
          .catch(e => {
            this.setState({ loading: false });
          });
      });
    }
  }

  followUser() {
    this.setState({ updating: true });
    const { user } = this.state;
    getFile("following").then(f => {
      let following;
      if (!f) {
        following = [];
      } else {
        following = JSON.parse(f);
      }
      const avatarUrl =
        user.image && user.image.length > 0 && user.image[0].contentUrl;
      following.push({
        avatarUrl,
        name: user.name,
        username: this.props.match.params.user,
        bio: user.description
      });
      putFile("following", JSON.stringify(following)).then(
        this.setState({ updating: false, isFollowingUser: true })
      );
    });
  }

  unfollowUser() {
    this.setState({ updating: true });
    getFile("following").then(f => {
      let following;
      if (!f) {
        following = [];
      } else {
        following = JSON.parse(f);
      }
      const newList = following.filter(
        f => f.username !== this.props.match.params.user
      );
      putFile("following", JSON.stringify(newList)).then(
        this.setState({ updating: false, isFollowingUser: false })
      );
    });
  }

  render() {
    const {
      repositories,
      user,
      loading,
      updating,
      loadingFollowing,
      isFollowingUser
    } = this.state;

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
                  {repo.stargazers && repo.stargazers.totalCount}{" "}
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

    console.log(user);
    const avatarUrl =
      user.image && user.image.length > 0 && user.image[0].contentUrl;
    console.log(avatarUrl);
    const userFullName = user.name;
    const username = this.props.match.params.user;
    const location = null;
    const company = null;
    const bio = user.description;
    const organizations = [];
    return (
      <ProfileContainer>
        <Profile
          avatarUrl={avatarUrl}
          userFullName={userFullName}
          username={username}
          location={location}
          company={company}
          bio={bio}
          organizations={organizations}
          contactable={username !== loadUserData().username}
        />

        <div>
          {!loadingFollowing && !isFollowingUser && (
            <FollowButton onClick={() => this.followUser()}>
              <ButtonIcon className="fa fa-user" /> Follow
            </FollowButton>
          )}
          {!loadingFollowing && isFollowingUser && (
            <UnfollowButton onClick={() => this.unfollowUser()}>
              <ButtonIcon className="fa fa-user" /> Unfollow
            </UnfollowButton>
          )}
          {(loading || updating) && <LoadingIndicator />}
          {!loading && (
            <InformationContainer>
              <div>
                {repos.length > 1 && (
                  <OverviewTitle>Repositories</OverviewTitle>
                )}
                {repos.length === 0 && (
                  <OverviewTitle>No repositories published yet</OverviewTitle>
                )}
                <RepoContainer>{repos}</RepoContainer>
              </div>
            </InformationContainer>
          )}
        </div>
      </ProfileContainer>
    );
  }
}

const FollowButton = styled.a`
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
  hover: {
    text-decoration: none;
  }
`;

const UnfollowButton = styled.a`
  cursor: pointer;
  border-radius: 0.25em;
  color: black;
  background-color: #eff3f6;
  background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);
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
  hover: {
    text-decoration: none;
  }
`;

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

const ProfileContainer = styled.section`
  display: flex;
  max-width: 1012px;
  margin: 0 auto;
  height: 100px;
`;

const InformationContainer = styled.section`
  margin-top: 24px;
`;

const ButtonIcon = styled.i``;

export default User;
