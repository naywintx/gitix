import React, { Component } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";

import Nav from "./Nav";
import Profile from "./Profile";
import Overview from "./Overview";
import Repositories from "./Repositories";
import AddRepositories from "./AddRepositories";
import Followers from "./Followers";
import Following from "./Following";
import ProfileMenu from "./ProfileMenu";
import PullRequests from "./PullRequests";
import Issues from "./Issues";
import Stars from "./Stars";
import User from "./User";

import { isUserSignedIn, loadUserData } from "blockstack";

const Home = ({
  avatarUrl,
  userFullName,
  username,
  location,
  company,
  bio,
  organizations
}) => {
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
      />

      <div>
        <ProfileMenu />
        <InformationContainer>
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/`}
            component={Overview}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/repositories`}
            component={Repositories}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/repositories/add`}
            component={AddRepositories}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/followers`}
            component={Followers}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/following`}
            component={Following}
          />
          <Route path={`${process.env.PUBLIC_URL}/stars`} component={Stars} />
        </InformationContainer>
      </div>
    </ProfileContainer>
  );
};

class App extends Component {
  state = { viewer: null };
  componentDidMount() {
    if (isUserSignedIn()) {
      const user = loadUserData();
      this.setState({
        viewer: {
          avatarUrl: user.profile.image[0].contentUrl,
          userFullName: user.profile.name,
          username: user.username,
          location: null,
          company: null,
          bio: user.profile.description,
          organizations: {}
        }
      });
    }
  }
  render() {
    const { viewer } = this.state;

    const avatarUrl = viewer ? viewer.avatarUrl : "";
    const userFullName = viewer ? viewer.userFullName : "";
    const username = viewer ? viewer.username : "";
    const location = viewer ? viewer.location : "";
    const company = viewer ? viewer.company : "";
    const bio = viewer ? viewer.bio : "";
    const organizations = viewer ? viewer.organizations : {};

    return (
      <section>
        <Nav avatarUrl={avatarUrl} username={username} />
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/issues`} component={Issues} />
          <Route
            path={`${process.env.PUBLIC_URL}/pullrequests`}
            component={PullRequests}
          />
          <Route
            exact
            path={`${process.env.PUBLIC_URL}/u/:user`}
            component={User}
          />
          <Route
            path={`${process.env.PUBLIC_URL}/`}
            render={() => (
              <Home
                avatarUrl={avatarUrl}
                userFullName={userFullName}
                username={username}
                location={location}
                company={company}
                bio={bio}
                organizations={organizations}
              />
            )}
          />
        </Switch>
      </section>
    );
  }
}

const ProfileContainer = styled.section`
  display: flex;
  max-width: 1012px;
  margin: 0 auto;
  height: 100px;
`;

const InformationContainer = styled.section`
  margin-top: 24px;
`;

export default App;
