import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoadingIndicator from "./LoadingIndicator";
import { getFile, loadUserData } from "blockstack";
import { NavLink } from "react-router-dom";

const suggestedUsers = [
  {
    avatarUrl:
      "https://gaia.blockstack.org/hub/1Maw8BjWgj6MWrBCfupqQuWANthMhefb2v/0/avatar-0",
    name: "Friedger Müffke",
    username: "friedger.id",
    bio: "Entredeveloper in Europe"
  },
  {
    avatarUrl:
      "https://gaia.blockstack.org/hub/1fHF3QADKT62js8BqHXmF31CFA1KUcTud/0//avatar-0",
    name: "Larry Salibra",
    username: "larry.id",
    bio: "Building a new internet for decentralized apps!"
  },
  {
    avatarUrl:
      "https://gaia.blockstack.org/hub/19AAYhqyS33YH8zrdmyN1PmEez8ZEEPQdT/0/avatar-0",
    name: "Dan Trevino",
    username: "dantrevino.id",
    bio: "Life, Liberty, and the Pursuit of Open Standards"
  }
];

export const toFollowingUser = (follower, i) => {
  return (
    <FollowersCard key={i}>
      <FollowersContainer>
        <NavLink to={`/u/${follower.username}`}>
          <FollowersImage src={follower.avatarUrl} />
        </NavLink>
        <FollowersInfoContainer>
          <FollowersName>
            <FollowerName>{follower.name}</FollowerName>
            <FollowerLogin>{follower.username}</FollowerLogin>
          </FollowersName>

          <FollowerBio>{follower.bio}</FollowerBio>
          {follower.location && (
            <div>
              <Icon className="fa fa-map-marker" />
              <FollowerLocation>{follower.location}</FollowerLocation>
            </div>
          )}
        </FollowersInfoContainer>
      </FollowersContainer>
    </FollowersCard>
  );
};

const Following = () => {
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState([]);
  const [suggestedFollowers, setSuggestedFollowers] = useState(suggestedUsers);
  useEffect(() => {
    setLoading(true);
    const name = loadUserData().username || "";

    getFile("following").then(f => {
      let followingUsers;
      if (f) {
        followingUsers = JSON.parse(f);
      } else {
        followingUsers = [];
      }
      setFollowing(followingUsers);

      const gitixSuggestions = suggestedUsers.filter(
        u =>
          u.username !== name &&
          followingUsers.filter(fu => fu.username === u.username).length === 0
      );
      setSuggestedFollowers(gitixSuggestions);

      setLoading(false);
    });
  }, []);

  const follow = !loading ? (
    following.map(toFollowingUser)
  ) : (
    <LoadingIndicator />
  );

  return (
    <>
      <section>{follow}</section>
      {suggestedFollowers.length > 0 && (
        <>
          <Title>Users you might want to follow</Title>
          <section>{suggestedFollowers.map(toFollowingUser)}</section>
        </>
      )}
    </>
  );
};

const Title = styled.p`
  color: #24292e;
  font-size: 16px;
  margin-bottom: 8px;
`;

const Icon = styled.i`
  font-size: 18px;
  margin-left: 4px;
`;

const FollowersContainer = styled.div`
  display: flex;
`;

const FollowersInfoContainer = styled.div`
  font-size: 12px;
`;

const FollowersName = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 4px;
`;

const FollowersImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 3px;
  margin-right: 5px;
`;

const FollowersCard = styled.div`
  border-bottom: 1px #d1d5da solid;
  padding: 16px;
  margin-bottom: 16px;
`;

const FollowerName = styled.p`
  font-size: 16px;
  color: #24292e;
  padding-left: 4px;
  margin-bottom: 0;
`;

const FollowerLogin = styled.p`
  font-size: 14px;
  margin-bottom: 0;
  color: #586069;
  padding-left: 4px;
  position: relative;
  top: -1px;
`;

const FollowerLocation = styled.p`
  font-size: 14px;
  color: #586069;
  padding-left: 4px;
  display: inline-block;
  margin-bottom: 4px;
`;

const FollowerBio = styled.p`
  font-size: 14px;
  color: #586069;
  padding-left: 4px;
  margin-bottom: 4px;
`;

export default Following;
