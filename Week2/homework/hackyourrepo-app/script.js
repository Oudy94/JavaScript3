"use strict";

let repoObj = []; //store the repositories from github here

function fetchData(url){

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            else {
                addFailedToDom();
            }
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log(error.message);
            addFailedToDom();
        });
}

function addRepoToDOM(data){

    repoObj = data //store the repositories

    const app = `
    <div id="app">
        <section id="app-header">
            <h1>HYF Repositories...</h1>
            <select name="Repo List" id="app-header-list">

            </select>
        </section>

        <section id="app-container">
            <div id="app-container-repo">
                <h2>Information</h2>
                <div id="app-container-repo-box">
                    <table>
                        <tr>
                          <th><h3>Name:</h3></th>
                          <td><h4 id="app-container-repo-box-name"></h4></td>
                        </tr>
                        <tr>
                          <th><h3>Description:</h3></th>
                          <td><h4 id="app-container-repo-box-description"></h4></td>
                        </tr>
                        <tr>
                            <th><h3>Forks:</h3></th>
                            <td><h4 id="app-container-repo-box-forks"></h4></td>
                        </tr>
                        <tr>
                            <th><h3>Updated:</h3></th>
                            <td><h4 id="app-container-repo-box-updated"></h4></td>
                        </tr>
                      </table>
                </div>
            </div>

            <div id="app-container-contributors">
                <h2>Contributors</h2>
                <div id="app-container-contributors-box">
                </div>
            </div>

            <div id="app-container-failed"></div>
        </section>

        <section id="app-footer">
            <h6>By Saoud Salem Ba-khmais</h6>
        </section>
    </div>   
    `;
    document.body.innerHTML = app;

    let repositoryName = `<option value="select-repo" selected disabled>Select a repository</option>`;

    for (const repository of data){
        repositoryName += `<option value="${repository.name}">${repository.name}</option>`;
    }

    const repoList = document.getElementById("app-header-list");
    repoList.innerHTML = repositoryName;
}

function addRepoConToDOM(data){

    const contributorList = document.getElementById("app-container-contributors-box");

    let output = "";
    for (const contributor of data){
        output += `
        <div class="app-container-contributors-box-list">
            <img src="${contributor.avatar_url}" class="app-container-contributors-box-list-img">
            <h5 class="app-container-contributors-box-list-name">${contributor.login}</h5>
            <h5>${contributor.contributions}</h5>
        </div>  
        `;
    };

    contributorList.innerHTML = output;
}

function changeRepoInfo(){

    const repoName = document.getElementById("app-container-repo-box-name");
    const repoDescription = document.getElementById("app-container-repo-box-description");
    const repoForks = document.getElementById("app-container-repo-box-forks");
    const repoUpdated = document.getElementById("app-container-repo-box-updated");
    const repoList = document.getElementById("app-header-list");
    const repoID = repoList.selectedIndex - 1;

    if (repoID < 0)
        return

    repoName.textContent = repoObj[repoID].name;
    repoDescription.textContent = repoObj[repoID].description;
    repoForks.textContent = repoObj[repoID].forks;
    repoUpdated.textContent = repoObj[repoID].updated_at.replace(/[ tz]/gi, ' ');
}

function addFailedToDom(){

    const repoInfoArea = document.getElementById("app-container-repo");
    repoInfoArea.style.display = "none"; //hide repoInfoArea

    const repoContributorsArea = document.getElementById("app-container-contributors");
    repoContributorsArea.style.display = "none"; //hide repoContributorsArea

    const repositoryFailedArea = document.getElementById("app-container-failed");
    const repositoryFailed = `<h2>Netwrork request failed.</h2>`;
    repositoryFailedArea.innerHTML = repositoryFailed;
}

function main(){
    fetchData('https://api.github.com/orgs/HackYourFuture/repos?per_page=100') //fetch the repositories
    .then(addRepoToDOM)
    .then(() =>{
        const repoList = document.getElementById("app-header-list");
        repoList.addEventListener('change', fetchContributors)
    })
    .catch(error => {
        console.log(error.message);
        addFailedToDom();
    });
}

function fetchContributors(){

    changeRepoInfo(); // since the data for repositories already fetched then this function will executed directly

    const repoList = document.getElementById("app-header-list");
    const repoID = repoList.selectedIndex -1;

    fetchData(repoObj[repoID].contributors_url) //fetch the contributors
    .then(addRepoConToDOM)
    .catch(error => {
        console.log(error.message);
        addFailedToDom();
    });
}

window.addEventListener("load", main);

    