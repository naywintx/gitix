import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Relation } from "./models";
import { useBlockstack } from "react-blockstack";
import { lookupProfile } from "../lib/blockstack";

const Followers = () => {
  const [followerList, setFollowerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useBlockstack();

  useEffect(() => {
    setLoading(true);
    async function fetchFollowers() {
      const f = await Relation.fetchList({ followee: userData.username });
      console.log({ f });
      return f;
    }

    fetchFollowers().then(followerList => {
      setFollowerList(followerList);
      Promise.all(
        followerList.map(f => {
          console.log(f);
          return lookupProfile(f.attrs.follower).then(p => {
            console.log(p);
            return {
              name: p.name,
              login: f.attrs.follower,
              avatarUrl: p.image[0].contentUrl,
              bio: p.description
            };
          });
        })
      ).then(profiles => {
        setFollowerList(profiles);
        setLoading(false);
      });
    });
  }, [userData.username]);
  const followers =
    followerList.length > 0 ? (
      followerList.map((follower, i) => {
        console.log(follower);
        return (
          <FollowersCard key={i}>
            <FollowersContainer>
              <FollowersImage src={follower.avatarUrl} />
              <FollowersInfoContainer>
                <FollowersName>
                  <FollowerName>{follower.name}</FollowerName>
                  <FollowerLogin>{follower.login}</FollowerLogin>
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
      <div>Share your profile with your friends to follow you.</div>
    );
  return (
    <>
      <section>
        {followers}
        {loading && <div>Loading...</div>}
      </section>
    </>
  );
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
  color: #586069;
  padding-left: 4px;
  position: relative;
  margin-bottom: 0;
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

export default Followers;
