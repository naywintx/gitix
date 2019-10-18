import React, { useEffect, useState } from "react";
import AppContainer from "./components/App-Container";
import { withRouter } from "react-router-dom";
import { useBlockstack } from "react-blockstack";
import { checkIsSignedIn } from "./lib/blockstack";
import { Helmet } from "react-helmet";

const NotSignedIn = {
  checking: false,
  user: null,
  isSignedIn: false
};
export const UserStateContext = React.createContext(NotSignedIn);

const App = () => {
  const [signIn, setSignIn] = useState({ ...NotSignedIn, checking: true });
  const { userData } = useBlockstack()

  useEffect(() => {
      if (userData) {
        setSignIn({ checking: false, user: userData, isSignedIn: true });
      } else {
        setSignIn(NotSignedIn);
      }
  }, [userData]);

  const title = "gitix.org";
  const metaDescription = "Decentralized git profiles";
  const img = "https://app.gitix.org/favicon.ico";
  return (
    <UserStateContext.Provider value={signIn}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={metaDescription} />
        <meta name="og:type" content="website" />
        <meta name="og:image" content={img} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="gitix.org" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={metaDescription} />
      </Helmet>

      <AppContainer />
    </UserStateContext.Provider>
  );
};

export default withRouter(App);
