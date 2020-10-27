function addDoguUsingXHR(){

    //const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://dog.ceo/api/breeds/image/random", true);

    xhr.onload = function() {
        if (this.status == 200){
            const responseData = JSON.parse(xhr.responseText);
            appendImage(responseData.message);
        }
        else
            console.log(xhr.responseText);
    };

    xhr.onerror = function(){
        console.log("something went wrong.");
    }

    xhr.send();
}


function addDogUsingAxios(){

    //const axios = require('axios');

    axios.get('https://dog.ceo/api/breeds/image/random').then(function (response) {

        appendImage(response.data.message);
    })
    .catch(function (error) {
        console.log(error, error.response);
    });
}


function appendImage(responseImage){

    if (!document.getElementById("dog-list")){
        const listContainer = document.querySelector(".list-container");
        const dogUL = document.createElement("ul");
        dogUL.id = "dog-list";
        listContainer.appendChild(dogUL);
    }

    const dogUnorderedList = document.getElementById("dog-list");
    const dogList = document.createElement("li");
    const dogImage = document.createElement("img");

    dogImage.src = responseImage;

    dogUnorderedList.appendChild(dogList);
    dogList.appendChild(dogImage);

}

const dogButtonXHR = document.getElementById("add_dog_xhr");
dogButtonXHR.addEventListener("click", addDoguUsingXHR);

const dogButtonAxios = document.getElementById("add_dog_axios");
dogButtonAxios.addEventListener("click", addDogUsingAxios);
