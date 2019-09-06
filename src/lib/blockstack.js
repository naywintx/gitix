import { UserSession, lookupProfile as bsLookupProfile } from "blockstack";
import { sampleRepos } from "../components/Repositories";

export const userSession = new UserSession();

export const isUserSignedIn = () => userSession.isUserSignedIn();

export const loadUserData = () => userSession.loadUserData();

export const lookupProfile = username => bsLookupProfile(username);

export const getRepositories = username =>
  userSession
    .getFile("repositories", { decrypt: false, username })
    .then(repositories => {
      if (repositories) {
        const repoArray = JSON.parse(repositories);
        if (Array.isArray(repoArray)) {
          return repoArray;
        } else {
          return [
            {
              name: "[outdated-repository-list-schema]",
              owner: { username: "gitix admin" },
              url: "https://github.com/friedger/gitix",
              description:
                "Please remove all repos from your gitix profile and start again. Sorry!",
              languages: [{ name: "(error)" }],
              stargazers: { totalCount: 0 },
              forkCount: 0
            }
          ];
        }
      } else {
        return null;
      }
    })
    .catch(e => {
      if (username && e.message === "Missing readURL") {
        return null;
      }
      return sampleRepos;
    });

export const putRepositories = repositories => {
  userSession.putFile("repositories", JSON.stringify(repositories), {
    encrypt: false
  });
};

export const deleteRepositories = () => {
  return userSession.deleteFile("repositories");
};

export const getFollowing = () =>
  userSession.getFile("following").then(f => {
    let following;
    if (!f) {
      following = [];
    } else {
      following = JSON.parse(f);
    }
    return following;
  });

export const putFollowing = following =>
  userSession.putFile("following", JSON.stringify(following));

export const getGithubRepos = profile => {
  if (profile && profile.account) {
    const githubAccounts = profile.account.filter(a => a.service === "github");

    if (githubAccounts.length > 0) {
      return fetch(
        `https://api.github.com/users/${
          githubAccounts[0].identifier
        }/repos?sort=pushed`
      )
        .then(response => response.json())
        .then(githubRepos => {
          return githubRepos.map(ghRepo => {
            return {
              name: ghRepo.name,
              owner: { username: ghRepo.owner.login },
              url: ghRepo.html_url,
              description: ghRepo.description,
              languages: [{ name: ghRepo.language }],
              stargazers: { totalCount: ghRepo.stargazers_count },
              forkCount: ghRepo.forks_count
            };
          });
        });
    }
  }
  return Promise.resolve();
};
