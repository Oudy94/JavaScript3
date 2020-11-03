"use strict";

// const isBiggerThan10 = function(number){
function isBiggerThan10(number){

    const promising = new Promise(function(resolve, reject){

        if (number > 10)
            resolve("The number is bigger than 10!");
        
        else
            reject(new Error("Error! The number is smaller than 10..."));

    });

    return promising;
}

isBiggerThan10(11)
    .then(function(fulfilled){
        console.log(fulfilled);
    })

    .catch(function(error) {
        console.log(error.message);
    })
