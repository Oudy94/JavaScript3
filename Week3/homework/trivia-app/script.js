"use strict";

async function fetchData(){
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=5");
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else{
            throw 'error';
        }
    } 
    catch (error) {
        console.log(error.message);
    }
}

function addTriviasToDOM(data){

    // add the app structure
    const app = `
    <div id="app">
        <h1>Let's play some Trivia!</h1>
        <h2>Try your best to figure out the answer. If you really have no clue, click on the question to reveal the answer...</h2>

        <div id="app-questions"></div>
    </div>
    `;
    document.body.innerHTML = app;

    // add trivia questions
    let triviaName = "";
    for (const trivia of data.results){
        triviaName += `
        <button class="accordion">${trivia.question}</button>
        <div class="panel">
            <p>${trivia.correct_answer}</p>
        </div>
        `;
    }
    document.getElementById("app-questions").innerHTML = triviaName;

    //accordion
    const buttons = document.getElementsByClassName("accordion");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
            //"this" refer to buttons[i]

            this.classList.toggle("active"); //hover effect when selected

            const panel = this.nextElementSibling; //get selected button panel
            if (panel.style.maxHeight) { //if accordion open
                panel.style.maxHeight = null; //close accordion
            } 
            else {
                panel.style.maxHeight = panel.scrollHeight + "px"; //open accordion
            }
        });
    }
}

async function main(){
    try {
        const fetch = await fetchData();
        addTriviasToDOM(fetch);    
    } catch (error) {
        console.log(error.message);
    }
}

window.addEventListener("load", main);
    



