"use strict";

function fetchData(url){

    return fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.log('err', error);
        });
}

function addPokemonToDOM(data){
    //add the app
    const app = `
    <div id="app">
        <h1>Pokemons</h1>
        <select name="Pokemon List" id="app-list">

        </select>
        <div id="app-image"></div>
    </div>
    `;
    document.body.innerHTML = app;

    //add pokemons names
    let pokemonName = `<option value="select-pokimon" selected disabled>Select A Pokimon!</option>`;

    for (const pokemon of data.results){
        pokemonName += `<option value="${pokemon.name}">${pokemon.name}</option>`;
    };

    const pokemonList = document.getElementById("app-list");
    pokemonList.innerHTML = pokemonName;
}

function addPokemonImage(data){
    //add pokemon image
    const pokemonImageArea = document.getElementById("app-image");
    const pokemonImageURL = data.sprites.versions["generation-v"]["black-white"].animated.front_default;
    const pokemonImage = `<img src="${pokemonImageURL}">`;

    pokemonImageArea.innerHTML = pokemonImage;
}

function main(){
    fetchData("https://pokeapi.co/api/v2/pokemon?limit=105") //fetch pokemons names
    .then(addPokemonToDOM)
    .then( ()=>{
        const pokemonList = document.getElementById("app-list");
        pokemonList.addEventListener("change", changePokemon);
    })
    .catch(error =>{
        console.log(error.message);
    });
}

function changePokemon(){
    const pokemonList = document.getElementById("app-list");
    const pokemonID = pokemonList.selectedIndex;

    fetchData(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`) //fetch pokemon image
    .then(addPokemonImage)
    .catch(error =>{
        console.log(error.message);
    });
}

window.addEventListener("load", main);


