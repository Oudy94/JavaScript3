"use strict";

function getUserUsingXHR(){

    //const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://www.randomuser.me/api", true);

    xhr.onload = function() {
        if (this.status == 200)
            console.log(JSON.parse(xhr.responseText));
        else
            console.log(xhr.responseText);
    };

    xhr.onerror = function(){
        console.log("something went wrong.");
    }

    xhr.send();
}

function getUserUsingAxios(){

    //const axios = require('axios');

    axios.get('https://www.randomuser.me/api').then(function (response) {
        console.log(response.data);

    }).catch(function (error) {
        console.log(error, error.response);

    });
}

getUserUsingXHR();

getUserUsingAxios();
