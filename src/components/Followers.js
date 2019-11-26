import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Relation } from "./models";
import { useBlockstack } from "react-blockstack";
import { lookupProfile } from "../lib/blockstack";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  TelegramShareButton,
  TelegramIcon,
  RedditShareButton,
  RedditIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";
import "./Followers.css";

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

  const isAndroid = /(android)/i.test(navigator.userAgent);
  const title = "My Gitix Profile";
  const url = `https://app.gitix.org/#/u/${userData.username}`;
  const shareButtons = (
    <>
      {navigator && navigator.share && (
        <ShareButton
          onClick={() =>
            navigator.share({
              title,
              url
            })
          }
        >
          Share your profile
        </ShareButton>
      )}
      {navigator && !navigator.share && isAndroid && (
        <ShareButton
          onClick={() => {
            window.open(
              `intent://share/#Intent;action=android.intent.action.SEND;S.android.intent.extra.TEXT=${title}:${url};end`
            );
          }}
        >
          Share your profile
        </ShareButton>
      )}
      {!navigator ||
        (!navigator.share && !isAndroid && (
          <>
            <div className="share">
              <FacebookShareButton
                url={url}
                quote={title}
                className="share-button"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </div>
            <div className="share">
              <TwitterShareButton
                url={url}
                title={title}
                className="share-button"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>
            </div>
            <div className="share">
              <TelegramShareButton
                url={url}
                title={title}
                className="share-button"
              >
                <TelegramIcon size={32} round />
              </TelegramShareButton>
            </div>
            <div className="share">
              <RedditShareButton
                url={url}
                title={title}
                windowWidth={660}
                windowHeight={460}
                className="share-button"
              >
                <RedditIcon size={32} round />
              </RedditShareButton>
            </div>
            <div className="share">
              <EmailShareButton
                url={url}
                subject={title}
                body="body"
                className="share-button"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </div>
          </>
        ))}
    </>
  );

  const followers =
    followerList.length > 0 ? (
      followerList.map((follower, i) => {
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
      <div>
        Share your profile with your friends, family, colleagues to follow you.
        <br />
        Your repositories will appear in their overview page.
      </div>
    );
  return (
    <>
      <section>
        {followers}
        {loading && <div>Loading...</div>}
        <br />
        {shareButtons}
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

const ShareButton = styled.a`
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

export default Followers;
