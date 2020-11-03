"use strict";

const repoList = document.getElementById("app-header-list");
let repoObj = []; //store the repositories from github here

function fetchData(repoID){

    let url;

    if(!repoID)
        url = 'https://api.github.com/orgs/HackYourFuture/repos?per_page=100'; //fetch the repositories
    else
        url = repoObj[repoID-1].contributors_url; //fetch the contributors

    const fetching = fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            addFailedToDom();
        }
    })
    .then(data => {
        if(!repoID)
            repoObj = data; //store the repositories
        return data;
    })
    .catch(error => {
        console.log(error.message);
        addFailedToDom();
    });

    return fetching;
}

function addRepoToDOM(data){

    if(data){
        data.map(repository => {
            const repositoryName = document.createElement("option");
            repositoryName.textContent = repository.name;
            repositoryName.value = repository.name;
            repoList.appendChild(repositoryName);

        });
    }
}

function changeRepoInfo(){

    const repoName = document.getElementById("app-container-repo-box-name");
    const repoDescription = document.getElementById("app-container-repo-box-description");
    const repoForks = document.getElementById("app-container-repo-box-forks");
    const repoUpdated = document.getElementById("app-container-repo-box-updated");
    const repoID = repoList.selectedIndex;

    if (repoID >= 0){
        repoName.textContent = repoObj[repoID - 1].name;
        repoDescription.textContent = repoObj[repoID - 1].description;
        repoForks.textContent = repoObj[repoID - 1].forks;
        repoUpdated.textContent = repoObj[repoID - 1].updated_at.replace(/[ tz]/gi, ' ');

        const selectOption = document.getElementById("app-header-list-select");
        if (!selectOption.disabled){
            selectOption.disabled = true; //disabled select "select a repository"
        }
    }
}

function addRepoConToDOM(data){
    const contributorList = document.getElementById("app-container-contributors-box");

    while (contributorList.hasChildNodes()) {
        contributorList.removeChild(contributorList.lastChild); //remove previous contributors
    }

    let output = "";
    data.forEach(contributor => {
        output += `
        <div class="app-container-contributors-box-list">
            <img src="${contributor.avatar_url}" class="app-container-contributors-box-list-img">
            <h5 class="app-container-contributors-box-list-name">${contributor.login}</h5>
            <h5>${contributor.contributions}</h5>
        </div>  
        `;

        contributorList.innerHTML = output;
    });
}

function addFailedToDom(){

    const repositoryFailedArea = document.getElementById("app-container-failed");
    const repositoryFailed = document.createElement("h2");
    repositoryFailed.textContent = "Netwrork request failed";
    repositoryFailedArea.appendChild(repositoryFailed);

    const repoInfoArea = document.getElementById("app-container-repo");
    repoInfoArea.style.display = "none"; //hide repoInfoArea

    const repoContributorsArea = document.getElementById("app-container-contributors");
    repoContributorsArea.style.display = "none"; //hide repoContributorsArea

    throw new Error('Netwrork request failed');

}

function main(fetchRepoOnly){

    //fetch repositories
    if (fetchRepoOnly){
        fetchData()
        .then(addRepoToDOM)
        .catch(function (error) {
            console.log(error.message);
            addFailedToDom();
        });
    }

    //fetch contributors
    else{
        const repoID = repoList.selectedIndex;

        fetchData(repoID)
        .then(addRepoConToDOM)
        .catch(function (error) {
            console.log(error.message);
            addFailedToDom();
        });
    }
}

window.addEventListener("load", main);

repoList.addEventListener('change', () =>{
    
    changeRepoInfo();
    main(false);

});
