class Person{

    constructor(name, age, gender, residence, isMarried, numOfChildren, job, likes) {
        if((typeof name === "string" && typeof gender === "string" && typeof residence === "string" && typeof job === "string")
        && (typeof age === "number" && typeof numOfChildren === "number")
        && (typeof isMarried === "boolean")
        && (Array.isArray(likes)))   
        {
            this.name = name;
            this.age = age;
            this.gender = gender;
            this.residence = residence;
            this.isMarried = isMarried;
            this.numOfChildren = numOfChildren;
            this.job = job;
            this.likes = likes;
        }
        else{
            throw 'check your inputs!';
        }
    }

    //make the first letter capital
    static capitalize(string) {
        if (typeof string !== 'string'){
            return "";
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    story(){
        //add the right words based on the gender
        const genderText = (this.gender === "male") ? ["man", "he", "wife"] : ["female", "she", "husband"];
    
        //check if the person has kids or not and add the right words based on that
        const numOfChildrenText = (this.numOfChildren > 0) ? ["and", "but has"] : ["but has no kids", "and has no kids"];

        //check if the person married or not and add the right words based on that
        const isMarriedText = (this.isMarried) ? `has a ${genderText[2]} ${numOfChildrenText[0]}` : `doesn't has a ${genderText[2]} ${numOfChildrenText[1]}`;

        //check if the first letter in the job is vowel or not to add the right prefix INDEFINITE ARTICLE
        const isVowel = (["a", "e", "i", "o", "u", "y"].includes(this.job[0].toLowerCase()));
        const article = (isVowel) ? "an" : "a";
        
        //ability to add as much "likes" as you want in the array...
        let likesText = (this.likes) ? `${Person.capitalize(genderText[1])} likes to ` : "";
        const len = this.likes.length;
        for (let i = 0; i < len; i++) {
            if ((len-1) === i){
                likesText += `${this.likes[i]}.`;
            }
            else{
                likesText += `${this.likes[i]} and `;
            }
        }

        return `${this.name} is a ${this.age} year old ${genderText[0]}, that lives in ${this.residence}. ${Person.capitalize(genderText[1])} ${isMarriedText} ${this.numOfChildren} children. As a day job ${genderText[1]}'s ${article} ${this.job}. ${likesText}`;
     }

}

class Animal{

    constructor(ownerName, animalSpecies, animalName, animalAge, animalColor, animalRoutine) {
        if((typeof ownerName === "string" && typeof animalSpecies === "string" && typeof animalName === "string" && typeof animalColor === "string")
        && (typeof animalAge === "number")
        && (Array.isArray(animalRoutine)))   
        {

            this.ownerName = ownerName;
            this.animalSpecies = animalSpecies;
            this.animalName = animalName;
            this.animalAge = animalAge;
            this.animalColor = animalColor;
            this.animalRoutine = animalRoutine;
        }
        else{
            throw 'check your inputs!';
        }
    }

    story(){
        let animalRoutineText = (this.animalRoutine) ? `Usually the ${this.animalSpecies} ` : "";
        const len = this.animalRoutine.length;
        for (let i = 0; i < len; i++) {
            if ((len-1) === i){
                animalRoutineText += `${this.animalRoutine[i]}.`;
            }
            else{
                animalRoutineText += `${this.animalRoutine[i]} or `;
            }
        }
        return `${this.ownerName} has a ${this.animalSpecies}, named ${this.animalName}. The ${this.animalSpecies} is ${this.animalAge} years old and has the color ${this.animalColor}. ${animalRoutineText} And they lived happily ever after!`;

    }
}

try {
    const person1 = new Person("Abdulkareem", 35, "male", "Riyadh", true, 3, "construction worker, that makes houses", ["eat dates", "smoke water pipe"]);
    console.log(person1.story());
} 
catch (error) {
    console.error(error);
}

try {
    const animal1 = new Animal("Abdulkareem", "horse", "Adel", 15, "brown", ["eats grass", "helps transport materials for Abdulkareem"]);
    console.log(animal1.story());
} catch (error) {
    console.error(error);
}

