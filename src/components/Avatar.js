import React from "react";
import styled from "styled-components";
import { isUserSignedIn, loadUserData } from "blockstack";

class UserAvatar extends React.Component {
  state = { loading: true, error: null, data: null };

  componentDidMount() {
    if (isUserSignedIn()) {
      const user = loadUserData();
      const avatarUrl =
        user.profile &&
        user.profile.image &&
        user.profile.image.length > 0 &&
        user.profile.image[0].contentUrl;
      this.setState({
        loading: false,
        error: null,
        data: {
          viewer: {
            avatarUrl
          }
        }
      });
    }
  }

  render() {
    const { loading, error, data } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error :(</div>;

    return <ProfilePic src={data.viewer.avatarUrl} />;
  }
}

const ProfilePic = styled.img`
  border-radius: 3px;
  height: 20px;
  width: 20px;
  cursor: pointer;
  margin-right: 4px;
  margin-top: 8px;
`;

export default UserAvatar;
