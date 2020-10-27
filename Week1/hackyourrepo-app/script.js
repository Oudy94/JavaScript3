"use strict";

const placeholderRepos = [
    {
      name: 'SampleRepo1',
      description: 'This repository is meant to be a sample',
      forks: 5,
      updated: '2020-05-27 12:00:00',
    },
    {
      name: 'AndAnotherOne',
      description: 'Another sample repo! Can you believe it?',
      forks: 9,
      updated: '2020-05-27 12:00:00',
    },
    {
      name: 'HYF-Is-The-Best',
      description:
        "This repository contains all things HackYourFuture. That's because HYF is amazing!!!!",
      forks: 130,
      updated: '2020-05-27 12:00:00',
    },
];

const repoName = document.getElementById("app-container-repo-box-name");
const repoDescription = document.getElementById("app-container-repo-box-description");
const repoForks = document.getElementById("app-container-repo-box-forks");
const repoUpdated = document.getElementById("app-container-repo-box-updated");
const repoList = document.getElementById("repo-list");

function selectRepo(){
    const repoIndex = repoList.selectedIndex;

    repoName.textContent = `${placeholderRepos[repoIndex].name}`;
    repoDescription.textContent = `${placeholderRepos[repoIndex].description}`;
    repoForks.textContent = `${placeholderRepos[repoIndex].forks}`;
    repoUpdated.textContent = `${placeholderRepos[repoIndex].updated}`;

}

selectRepo();


repoList.addEventListener("change", selectRepo);
