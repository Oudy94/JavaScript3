"use strict";

const getAnonName = firstName => {
    const promising = new Promise((resolve, reject) => {

        setTimeout(() => {
            if (!firstName)
                reject(new Error("You didn't pass in a first name!"));

            const fullName = `${firstName} Doe`;
            resolve(fullName);

        }, 2000);
    });

    return promising;
}


getAnonName('John')
    .then(fulfilled => {
        console.log(fulfilled);
    })
    .catch(error => {
        console.log(error.message);
    })
