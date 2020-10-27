"use strict";

function getHumorUsingXHR(){

    //const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://xkcd.now.sh/?comic=latest", true);

    xhr.onload = function() {
        if (this.status == 200){
            const responseData = JSON.parse(xhr.responseText);
            console.log(responseData);

            const humorImage = document.createElement("img");
            humorImage.src = responseData.img;
            document.body.appendChild(humorImage);
        }
    
        else
            console.log(xhr.responseText);
    };

    xhr.onerror = function(){
        console.log("something went wrong.");
    }

    xhr.send();
}

function getHumorUsingAxios(){

    //const axios = require('axios');

    axios.get('https://xkcd.now.sh/?comic=latest').then(function (response) {
        console.log(response.data);

        const humorImage = document.createElement("img");
        humorImage.src = response.data.img;
        document.body.appendChild(humorImage);

    })
    .catch(function (error) {
        console.log(error, error.response);

    });
}

getHumorUsingXHR();

getHumorUsingAxios();
