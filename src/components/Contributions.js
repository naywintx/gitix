import React from 'react';
import styled from 'styled-components'

const Contributions = () => {
  const [repositories, setRepositories] = useState([])
  const repos = repositories ? repositories.map(repo => (
      <RepoCard key={ repo.name }>
        <RepoLink>{ repo.name }</RepoLink>
        <RepoDescription>{ repo.description }</RepoDescription>
        <RepoDetails>{ repo.languages[0].name } <Icon className="fa fa-star" aria-hidden="true"></Icon> { repo.stargazers.totalCount } <Icon className="fa fa-code-fork" aria-hidden="true"></Icon> { repo.forkCount }</RepoDetails>
      </RepoCard>
    )
  ) : []

  return (
    <RepoContainer>
      { repos }
    </RepoContainer>
  )
}

const RepoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const RepoCard = styled.div`
  border: 1px #d1d5da solid;
  padding: 16px;
  width: 362px;
  margin-bottom: 16px;
`

const RepoDescription = styled.p`
  font-size: 12px;
  color: #586069;
`

const RepoLink = styled.a`
  font-weight: 600;
  font-size: 14px;
  color: #0366d6;
`

const RepoDetails = styled.span`
  color: #586069;
  font-size: 12px;
`

const Icon = styled.i`
  margin-left: 16px;
`

export default Contributions
