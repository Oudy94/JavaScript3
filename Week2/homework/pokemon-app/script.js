"use strict";

const pokemonList = document.getElementById("app-list");

function fetchData(pokemonID){

    let url;

    if (pokemonID <= 0)
        url = "https://pokeapi.co/api/v2/pokemon?limit=105"; //fetch pokemons names
    else
        url = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`; //fetch specific pokemon image

    const fetching = fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        let allData = {
            pokemonsData: data,
            pokemonDataID: pokemonID
        };
        return allData;
    })
    .catch(error => {
        console.log('err', error);
    });

    return fetching;
}

function addPokemonToDOM(data){

    const pokemonImageArea = document.getElementById("app-image");

    //add pokemons names only
    if (data.pokemonDataID <= 0){
        data.pokemonsData.results.map(pokemon => {
            const pokemonName = document.createElement("option");
            pokemonName.textContent = pokemon.name;
            pokemonName.value = pokemon.name;
            pokemonList.appendChild(pokemonName);
        });
    }

    //add pokemon image
    else{
        if(pokemonImageArea.hasChildNodes()){
            const pokemonImage = document.getElementById("app-image-pokemon");
            const pokemonImageURL = data.pokemonsData.sprites.versions["generation-v"]["black-white"].animated.front_default;
            pokemonImage.src = pokemonImageURL;
        }
        else{
            const pokemonImage = document.createElement("img");
            const pokemonImageURL = data.pokemonsData.sprites.versions["generation-v"]["black-white"].animated.front_default;
            pokemonImage.src = pokemonImageURL;
            pokemonImage.id = "app-image-pokemon";
            pokemonImageArea.appendChild(pokemonImage);

            const selectOption = document.getElementById("app-selected");
            selectOption.disabled = true;
        }
    }

}

function main(){

    const pokemonID = pokemonList.selectedIndex;
    fetchData(pokemonID)
    .then(addPokemonToDOM)
    .catch(function (error) {
        console.log(error.message);
    });

}

window.addEventListener("load", main);

pokemonList.addEventListener("change", main);
