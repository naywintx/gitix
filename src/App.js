import React, { Component } from "react";
import LoginScreen from "./components/LoginScreen";
import AppContainer from "./components/App-Container";
import { withRouter } from "react-router-dom";
import { Loading } from "gitstar-components";
import {
  isSignInPending,
  handlePendingSignIn,
  isUserSignedIn
} from "blockstack";

const STATUS = {
  INITIAL: "initial",
  LOADING: "loading",
  FINISHED_LOADING: "finished_loading",
  AUTHENTICATED: "authenticated"
};

class App extends Component {
  state = {
    status: STATUS.INITIAL
  };

  componentDidMount() {
    if (isSignInPending()) {
      handlePendingSignIn().then(() => {
        if (window) {
          window.location.href = window.location.origin;
        }
        this.setState({
          status: STATUS.AUTHENTICATED
        });
      });
    } else if (isUserSignedIn()) {
      this.setState({
        status: STATUS.AUTHENTICATED
      });
    }
  }
  render() {
    return (
      <section>
        {this.state.status === STATUS.AUTHENTICATED && <AppContainer />}

        <header>
          {this.state.status === STATUS.INITIAL && <LoginScreen />}
        </header>
        <Loading
          status={this.state.status}
          callback={() => {
            if (this.props.status !== STATUS.AUTHENTICATED) {
              this.setState({
                status: STATUS.AUTHENTICATED
              });
            }
          }}
        />
      </section>
    );
  }
}

export default withRouter(App);
