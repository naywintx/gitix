import React from "react";
import styled from "styled-components";
import { AppConfig, UserSession } from "blockstack";
import { BlockstackButton } from "react-blockstack-button";
import { useBlockstack } from "react-blockstack";

const LoginScreen = () => {
  const { signIn } = useBlockstack()
  return (
    <LoginContainer>
        <BlockstackButton variant="light" onClick={signIn} />
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
