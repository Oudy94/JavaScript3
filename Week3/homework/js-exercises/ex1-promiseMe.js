// Exercise A
async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);        
    } catch (error) {
        console.log(error) ;
    }
};

getData('https://randomfox.ca/floof/');

// Exercise B
const arrayOfWords = ['cucumber', 'tomatos', 'avocado'];

async function makeAllCaps (array){
  return await new Promise((resolve, reject) => {
    let capsArray = array.map(word => {
      if (typeof word === 'string') {
        return word.toUpperCase();
      } else {
        reject('Error: Not all items in the array are strings!');
      }
    });
    resolve(capsArray);
  });

};

async function init(){
    try {
       const result = await makeAllCaps(arrayOfWords);
       console.log(result);

    } catch (error) {
        console.log(error);
    }
}

init();
