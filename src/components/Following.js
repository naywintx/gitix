import React, { useState } from "react";
import styled from "styled-components";
import LoadingIndicator from "./LoadingIndicator";

const Following = () => {
  const [following, setFollowing] = useState([
    {
      avatarUrl:
        "https://gaia.blockstack.org/hub/1Maw8BjWgj6MWrBCfupqQuWANthMhefb2v/0/avatar-0",
      name: "Friedger Müffke",
      username: "friedger (github.com)",
      bio: "Entredeveloper in Europe"
    }
  ]);

  const follow = following ? (
    following.map((follower, i) => {
      return (
        <FollowersCard key={i}>
          <FollowersContainer>
            <FollowersImage src={follower.avatarUrl} />

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
    })
  ) : (
    <LoadingIndicator />
  );

  return <section>{follow}</section>;
};

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
