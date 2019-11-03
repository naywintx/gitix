import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import UserMenu from "./UserMenu";
import Avatar from "./Avatar";
import LoginView from "./LoginView";
import { useBlockstack } from "react-blockstack";

const activeStyles = () => ({
  fontWeight: "600",
  color: "#fff"
});

const linkstyles = () => ({
  color: "rgba(255,255,255,0.75)",
  textDecoration: "none"
});

const ClickOutside = React.forwardRef(({ children, onClick }, ref) => {
  const refs = React.Children.map(children, () => React.createRef());
  const handleClick = useCallback(
    e => {
      console.log(refs)
      const isOutside = refs.every(ref => {
        console.log(ref);
        return !ref.current.contains(e.target);
      });
      if (isOutside) {
        onClick();
      }
    },
    [refs, onClick]
  );

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return function() {
      document.removeEventListener("click", handleClick);
    };
  });

  return React.Children.map(children, (element, idx) =>
    React.cloneElement(element, { ref: refs[idx] })
  );
});

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userData, signIn, signOut } = useBlockstack();

  const username = userData && userData.username;
  const isSignedIn = !!signOut;

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <Header>
        <NavLink
          to={`${process.env.PUBLIC_URL}/`}
          style={{ padding: "0px 20px" }}
        >
          <Logo height="32" viewBox="0 0 97 97" width="32">
            <path d="M 45.725843,50.983403 31.645191,36.903453 c -0.810745,-0.811097 -2.125838,-0.811097 -2.937286,0 l -2.923597,2.9243 3.708722,3.708723 c 0.861988,-0.291307 1.850325,-0.09582 2.537178,0.591388 0.691064,0.691415 0.884801,1.688176 0.586123,2.553322 l 3.575003,3.574652 c 0.865146,-0.298327 1.862609,-0.105292 2.553322,0.586474 0.965174,0.965173 0.965174,2.529105 0,3.494981 -0.965875,0.965524 -2.529807,0.965524 -3.496033,0 -0.725811,-0.726513 -0.905509,-1.793468 -0.537339,-2.687745 l -3.334235,-3.333885 v 8.773251 c 0.235151,0.116523 0.457316,0.271653 0.653159,0.467495 0.965173,0.965174 0.965173,2.529106 0,3.495332 -0.965174,0.964822 -2.530158,0.964822 -3.49463,0 -0.965173,-0.966577 -0.965173,-2.530509 0,-3.495332 0.238661,-0.23831 0.514876,-0.418709 0.809693,-0.539444 v -8.855027 c -0.294817,-0.120735 -0.57033,-0.29938 -0.809693,-0.539445 -0.731075,-0.730724 -0.906912,-1.803996 -0.532074,-2.701783 l -3.656076,-3.656779 -9.655246,9.654191 c -0.811096,0.811799 -0.811096,2.126891 0,2.937988 l 14.081355,14.080303 c 0.810746,0.81109 2.125488,0.81109 2.937286,0 l 14.01502,-14.015022 c 0.811097,-0.811097 0.811097,-2.126892 0,-2.937988 z" />
            <path d="M 67.104258,60.702875 53.023606,46.622925 c -0.810745,-0.811097 -2.125838,-0.811097 -2.937286,0 l -2.923597,2.9243 3.708722,3.708723 c 0.861988,-0.291307 1.850325,-0.09582 2.537178,0.591388 0.691064,0.691415 0.884801,1.688176 0.586123,2.553322 l 3.575003,3.574652 c 0.865146,-0.298327 1.862609,-0.105292 2.553322,0.586474 0.965174,0.965173 0.965174,2.529105 0,3.494981 -0.965875,0.965524 -2.529807,0.965524 -3.496033,0 -0.725811,-0.726513 -0.905509,-1.793468 -0.537339,-2.687745 l -3.334235,-3.333885 v 8.773251 c 0.235151,0.116523 0.457316,0.271653 0.653159,0.467495 0.965173,0.965174 0.965173,2.529106 0,3.495332 -0.965174,0.964822 -2.530158,0.964822 -3.49463,0 -0.965173,-0.966577 -0.965173,-2.530509 0,-3.495332 0.238661,-0.23831 0.514876,-0.418709 0.809693,-0.539444 V 57.88141 c -0.294817,-0.120735 -0.57033,-0.29938 -0.809693,-0.539445 -0.731075,-0.730724 -0.906912,-1.803996 -0.532074,-2.701783 l -3.656076,-3.656779 -9.655244,9.654191 c -0.811096,0.811799 -0.811096,2.126891 0,2.937988 l 14.081353,14.080303 c 0.810746,0.81109 2.125488,0.81109 2.937286,0 l 14.01502,-14.015022 c 0.811097,-0.811097 0.811097,-2.126892 0,-2.937988 z" />
            <path d="M 63.977747,32.486115 49.897095,18.406165 c -0.810745,-0.811097 -2.125838,-0.811097 -2.937286,0 l -2.923597,2.9243 3.708722,3.708723 c 0.861988,-0.291307 1.850325,-0.09582 2.537178,0.591388 0.691064,0.691415 0.884801,1.688176 0.586123,2.553322 l 3.575003,3.574652 c 0.865146,-0.298327 1.862609,-0.105292 2.553322,0.586474 0.965174,0.965173 0.965174,2.529105 0,3.494981 -0.965875,0.965524 -2.529807,0.965524 -3.496033,0 -0.725811,-0.726513 -0.905509,-1.793468 -0.537339,-2.687745 l -3.334235,-3.333885 v 8.773251 c 0.235151,0.116523 0.457316,0.271653 0.653159,0.467495 0.965173,0.965174 0.965173,2.529106 0,3.495332 -0.965174,0.964822 -2.530158,0.964822 -3.49463,0 -0.965173,-0.966577 -0.965173,-2.530509 0,-3.495332 0.238661,-0.23831 0.514876,-0.418709 0.809693,-0.539444 V 29.66465 c -0.294817,-0.120735 -0.57033,-0.29938 -0.809693,-0.539445 -0.731075,-0.730724 -0.906912,-1.803996 -0.532074,-2.701783 l -3.656076,-3.656779 -9.655245,9.654191 c -0.811096,0.811799 -0.811096,2.126891 0,2.937988 l 14.081354,14.080303 c 0.810746,0.81109 2.125488,0.81109 2.937286,0 l 14.01502,-14.015022 c 0.811097,-0.811097 0.811097,-2.126892 0,-2.937988 z" />
            <path d="M 85.356162,42.205587 71.27551,28.125637 c -0.810745,-0.811097 -2.125838,-0.811097 -2.937286,0 l -2.923597,2.9243 3.708722,3.708723 c 0.861988,-0.291307 1.850325,-0.09582 2.537178,0.591388 0.691064,0.691415 0.884801,1.688176 0.586123,2.553322 l 3.575003,3.574652 c 0.865146,-0.298327 1.862609,-0.105292 2.553322,0.586474 0.965174,0.965173 0.965174,2.529105 0,3.494981 -0.965875,0.965524 -2.529807,0.965524 -3.496033,0 -0.725811,-0.726513 -0.905509,-1.793468 -0.537339,-2.687745 l -3.334235,-3.333885 v 8.773251 c 0.235151,0.116523 0.457316,0.271653 0.653159,0.467495 0.965173,0.965174 0.965173,2.529106 0,3.495332 -0.965174,0.964822 -2.530158,0.964822 -3.49463,0 -0.965173,-0.966577 -0.965173,-2.530509 0,-3.495332 0.238661,-0.23831 0.514876,-0.418709 0.809693,-0.539444 v -8.855027 c -0.294817,-0.120735 -0.57033,-0.29938 -0.809693,-0.539445 -0.731075,-0.730724 -0.906912,-1.803996 -0.532074,-2.701783 l -3.656076,-3.656779 -9.655245,9.654191 c -0.811096,0.811799 -0.811096,2.126891 0,2.937988 l 14.081354,14.080303 c 0.810746,0.81109 2.125488,0.81109 2.937286,0 l 14.01502,-14.015022 c 0.811097,-0.811097 0.811097,-2.126892 0,-2.937988 z" />
          </Logo>
        </NavLink>

        <NavContainer>
          <NavLink
            style={linkstyles()}
            activeStyle={activeStyles()}
            to={`${process.env.PUBLIC_URL}/pullrequests`}
          >
            <NavItem>Pull Requests</NavItem>
          </NavLink>

          <NavLink
            style={linkstyles()}
            activeStyle={activeStyles()}
            to={`${process.env.PUBLIC_URL}/issues`}
          >
            <NavItem>Issues</NavItem>
          </NavLink>

          <NavLink
            style={linkstyles()}
            activeStyle={activeStyles()}
            to={`${process.env.PUBLIC_URL}/new-repo`}
          >
            <NavItem>+ repo</NavItem>
          </NavLink>
        </NavContainer>

        {isSignedIn && (
          <UserSection>
            <Avatar onClick={openMenu} />
            <DropDownCaret onClick={openMenu} />
            {menuOpen && (
              <ClickOutside onClick={closeMenu}>
                <UserMenu
                  id={"dropdown-menu"}
                  username={username}
                  closeMenu={closeMenu}
                />
              </ClickOutside>
            )}
          </UserSection>
        )}
        {!isSignedIn && <LoginView />}
      </Header>
      {isSignedIn && (
        <>
          Share your public profile:{" "}
          <ShareLink
            href={`${process.env.PUBLIC_URL}/#/u/${username}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            https://app.gitix.org/#/u/{username}
          </ShareLink>
        </>
      )}
    </HeaderContainer>
  );
};

const HeaderContainer = styled.section`
  color: rgba(255, 255, 255, 0.75);
  background-color: #24292e;
  margin-bottom: 24px;
  position: relative;
`;

const Header = styled.div`
  max-width: 1012px;
  margin: 0 auto;
  padding-top: 12px;
  padding-bottom: 12px;
  align-items: center;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const Logo = styled.svg`
  fill: #fff;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  @media (min-width: 768px) {
    justify-content: inherit;
  }
`;

const NavItem = styled.li`
  padding: 0 12px;
  background-color: #24292e;
  list-style: none;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  &:hover {
    color: #fff;
  }
`;

const UserSection = styled.div`
  position: relative;
  padding: 0px 20px;
`;

const ShareLink = styled.a`
  text-decoration: none;
  color: #fff;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              #fff;
`;

const DropDownCaret = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  vertical-align: middle;
  content: "";
  border: 4px solid;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-left-color: transparent;
  cursor: pointer;
`;

export default withRouter(Nav);
