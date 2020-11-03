"use strict";

const getAnonName = function(firstName) {
    const promising = new Promise(function(resolve, reject) {

        setTimeout(() => {
            if (!firstName)
                reject(new Error("You didn't pass in a first name!"));

            const fullName = `${firstName} Doe`;
            resolve(fullName);

        }, 2000);
    });

    return promising;
}


getAnonName()
    .then(function(fulfilled) {
        console.log(fulfilled);
    })
    .catch(function(error) {
        console.log(error.message);
    })
