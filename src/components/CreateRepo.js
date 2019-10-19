import React, { useState } from "react";
import styled from "styled-components";
import moment from "moment";

const CreateRepo = () => {
  return (
    <div>
      <CreateRepoContainer>
        <p>
          Gitix does not provide hosting for git repositories. Please decide for
          yourself which hosting solution is the best for you.
        </p>
        Here are some suggestions:
        <ProviderList>
          <ProviderItem>
            <Link href="https://githuman.com" target="_blank" rel="noopener">
              <ProviderIcon src="/images/githuman.png" />
              Githuman
            </Link>{" "}
            - decentralized, using IPFS
          </ProviderItem>
          <ProviderItem>
            <Link
              href="https://git-scm.com/book/en/v2/Git-on-the-Server-Getting-Git-on-a-Server"
              target="_blank"
              rel="noopener"
            >
              <ProviderIcon src="/images/git.png" />
              Host yourself
            </Link>{" "}
            - Read the instructions
          </ProviderItem>
          <ProviderItem>
            <Link
              href="https://about.gitlab.com"
              target="_blank"
              rel="noopener"
            >
              <ProviderIcon src="/images/gitlab.png" />
              Gitlab
            </Link>{" "}
            - A single application for the entire DevOps lifecycle
          </ProviderItem>
          <ProviderItem>
            <Link href="https://github.com" target="_blank" rel="noopener">
              <ProviderIcon src="/images/github.png" />
              Github
            </Link>{" "}
            - Built for developers
          </ProviderItem>
          <ProviderItem>
            <Link href="https://bitbucket.org" target="_blank" rel="noopener">
              <ProviderIcon src="/images/bitbucket.png" />
              Bitbucket
            </Link>{" "}
            - Built for professional teams
          </ProviderItem>
        </ProviderList>
      </CreateRepoContainer>
    </div>
  );
};

const CreateRepoContainer = styled.section`
  width: 980px;
  margin: 0 auto;
`;

const ProviderList = styled.ul`
  font-size: 14px;
  :last-child {
    margin-left: 10px;
  }
`;

const ProviderItem = styled.li``;

const Link = styled.a`
  text-decoration: none;
`;

const ProviderIcon = styled.img`
  width: 16px;
  height: 16px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
`;

export default CreateRepo;
