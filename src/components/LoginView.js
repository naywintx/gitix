import React from "react";
import styled from "styled-components";
import { AppConfig, UserSession } from "blockstack";
import { BlockstackButton } from "react-blockstack-button";
const LoginScreen = () => {
  const login = () => {
    const appConfig = new AppConfig(["store_write", "publish_data"]);
    const userSession = new UserSession({ appConfig });
    userSession.redirectToSignIn();
  };
  return (
    <LoginContainer>
        <BlockstackButton variant="light" onClick={login} />
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default LoginScreen;
