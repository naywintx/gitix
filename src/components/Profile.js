import React from "react";
import styled from "styled-components";

const Profile = ({
  avatarUrl,
  userFullName,
  username,
  company,
  location,
  bio,
  organizations,
  contactable
}) => {
  const organsiationList =
    organizations && organizations.edges && organizations.edges.length > 0
      ? organizations.edges.map(org => {
          return <Avatar src={org.node.avatarUrl} />;
        })
      : [];

  return (
    <ProfileSection>
      {avatarUrl && avatarUrl !== "" ? (
        <ProfilePicContainer>
          <ProfilePic src={avatarUrl} />
        </ProfilePicContainer>
      ) : (
        <Placeholder />
      )}
      <NameSection>
        <UsersFullName>{userFullName}</UsersFullName>
        <UsersName>{username}</UsersName>
      </NameSection>

      <BioContainer>{bio ? bio : ""}</BioContainer>

      <ProfileDivider />

      <LocationSection>
        {company && (
          <div>
            <Icon className="fa fa-user" aria-hidden="true" />
            <Organisation>{company}</Organisation>
          </div>
        )}
        {location && (
          <div>
            <Icon className="fa fa-map-marker" aria-hidden="true" />
            <Location>{location}</Location>
          </div>
        )}
      </LocationSection>

      {organsiationList.length > 0 && (
        <div>
          <ProfileDivider />
          <Organization>Organizations</Organization>
          <Avatar src={organizations.edges[0].node.avatarUrl} />
        </div>
      )}

      {contactable && (
        <>
          <ContactButton
            href={`https://app.dmail.online/compose?to=${username}&subject=Gitix%20profile`}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ButtonIcon className="fa fa-envelope" /> Contact
          </ContactButton>
        </>
      )}
    </ProfileSection>
  );
};

const ContactButton = styled.a`
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
  &:hover: {
    text-decoration: none;
  }
`;

const ButtonIcon = styled.i``;

const ProfileSection = styled.section`
  padding-right: 20px;
  padding-left: 20px;
`;

const NameSection = styled.div`
  padding: 16px 0;
`;

const LocationSection = styled.div`
  padding: 16px 0;
`;

const ProfileDivider = styled.div`
  height: 1px;
  margin: 8px 1px;
  background-color: #e1e4e8;
`;

const Organization = styled.p`
  margin: 0;
  font-weight: 600;
  font-size: 16px;
`;

const Avatar = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 3px;
  margin-top: 2px;
`;

const UsersFullName = styled.p`
  font-weight: 600;
  font-size: 26px;
  line-height: 30px;
  margin: 0;
`;

const UsersName = styled.p`
  font-size: 20px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  color: #666;
  margin: 0;
`;

const ProfilePicContainer = styled.div`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  @media (min-width: 768px) {
    width: 230px;
  }
`;

const ProfilePic = styled.img`
  border-radius: 6px;
  width: 100%;
  max-width: 230px;
`;

const Placeholder = styled.div`
  border-radius: 6px;
  height: 230px;
  width: 230px;
  background: #fff;
`;

const Organisation = styled.p`
  font-weight: 600;
  font-size: 14px;
  margin: 0;
`;

const Location = styled.p`
  font-size: 14px;
  margin: 0;
`;

const Icon = styled.i`
  float: left;
  margin-right: 6px;
  margin-top: 3px;
`;

const BioContainer = styled.div`
  margin-bottom: 12px;
  max-width: 230px;
  font-size: 14px;
  color: #6a737d;
`;
export default Profile;
