import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
import { useBlockstack } from "react-blockstack";

import Nav from "./Nav";
import Profile from "./Profile";
import Overview from "./Overview";
import Repositories from "./Repositories";
import AddRepositories from "./AddRepositories";
import Followers from "./Followers";
import Following from "./Following";
import ProfileMenu from "./ProfileMenu";
import PullRequests from "./PullRequests";
import CreateRepo from "./CreateRepo";
import Issues from "./Issues";
import Stars from "./Stars";
import User from "./User";

import LoginScreen from "./LoginScreen";

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

const App = () => {
  const [state, setState] = useState({ viewer: null });
  const { userData } = useBlockstack();
  useEffect(() => {
    if (userData) {
      const user = userData;
      const avatarUrl =
        (user.profile &&
          user.profile.image &&
          user.profile.image.length > 0 &&
          user.profile.image[0].contentUrl) ||
        "/images/user.png";
      const username = user.username || user.identityAddress;
      const userFullName = user.profile && user.profile.name;
      const bio = user.profile && user.profile.description;
      setState({
        viewer: {
          avatarUrl,
          userFullName,
          username,
          location: null,
          company: null,
          bio,
          organizations: {}
        }
      });
    }
  }, [userData]);

  const { viewer } = state;
  const avatarUrl = viewer ? viewer.avatarUrl : "";
  const userFullName = viewer ? viewer.userFullName : "";
  const username = viewer ? viewer.username : "";
  const location = viewer ? viewer.location : "";
  const company = viewer ? viewer.company : "";
  const bio = viewer ? viewer.bio : "";
  const organizations = viewer ? viewer.organizations : {};

  return (
    <section>
      <Nav />
      <Switch>
        <Route
          path={`${process.env.PUBLIC_URL}/login`}
          component={LoginScreen}
        />
        <Route path={`${process.env.PUBLIC_URL}/issues`} component={Issues} />
        <Route
          path={`${process.env.PUBLIC_URL}/pullrequests`}
          component={PullRequests}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/new-repo`}
          component={CreateRepo}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL}/u/:user`}
          component={User}
        />
        <Route
          path={`${process.env.PUBLIC_URL}/`}
          render={() => (
            <>
              {viewer && (
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
              {!userData && <LoginScreen />}
            </>
          )}
        />
      </Switch>
    </section>
  );
};

const ProfileContainer = styled.section`
  max-width: 1012px;
  margin: 0 auto;
  display: block;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const InformationContainer = styled.section`
  margin-top: 24px;
  padding: 0px 20px;
`;

export default App;
