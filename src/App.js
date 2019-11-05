import React, { useEffect, useState } from "react";
import AppContainer from "./components/App-Container";
import { withRouter } from "react-router-dom";
import { useBlockstack } from "react-blockstack";
import { Helmet } from "react-helmet";
import { configure, User } from "radiks";
import { RADIKS_SERVER_URL } from "./components/constants";
import Footer from "./components/Footer";

const NotSignedIn = {
  checking: false,
  user: null,
  isSignedIn: false
};

const App = () => {
  const [ , setSignIn] = useState({ ...NotSignedIn, checking: true });
  const { userData, userSession } = useBlockstack();
  useEffect(() => {
    configure({
      apiServer: RADIKS_SERVER_URL,
      userSession
    });
  }, [userSession]);

  useEffect(() => {
    if (userData) {
      console.log("user configured")
      User.createWithCurrentUser().then(() => {
        setSignIn({ checking: false, user: userData, isSignedIn: true });
      });
    } else {
      setSignIn(NotSignedIn);
    }
  }, [userData]);

  const title = "gitix.org";
  const metaDescription = "Decentralized git profiles";
  const img = "https://app.gitix.org/favicon.ico";
  return (
    <>
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
      <Footer/>
    </>
  );
};

export default withRouter(App);
