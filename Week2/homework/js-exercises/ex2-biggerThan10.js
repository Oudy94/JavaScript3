"use strict";

function isBiggerThan10(number){

    const promising = new Promise((resolve, reject) => {

        if (number > 10){
            resolve("The number is bigger than 10!");
        }
        else if(number === 10){
            resolve("The number is equal to 10!");
        }
        else{
            reject(new Error("Error! The number is smaller than 10..."));
        }
    
    });

    return promising;
}

isBiggerThan10(10)
    .then(fulfilled => {
        console.log(fulfilled);
    })

    .catch(error => {
        console.log(error.message);
    })
