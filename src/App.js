import React, { useEffect, useState } from "react";
import LoginScreen from "./components/LoginScreen";
import AppContainer from "./components/App-Container";
import { withRouter } from "react-router-dom";
import { checkIsSignedIn, loadUserData } from "./lib/blockstack";

const NotSignedIn = {
  checking: false,
  user: null,
  isSignedIn: false
};
export const UserStateContext = React.createContext(NotSignedIn);

const App = () => {
  const [signIn, setSignIn] = useState({ ...NotSignedIn, checking: true });

  useEffect(() => {
    checkIsSignedIn().then(signedIn => {
      if (signedIn) {
        setSignIn({ checking: false, user: loadUserData(), isSignedIn: true });
      } else {
        setSignIn(NotSignedIn);
      }
    });
  }, []);
  return (
    <UserStateContext.Provider value={signIn}>
      <AppContainer />
    </UserStateContext.Provider>
  );
};

export default withRouter(App);
