const {people, ages} = require('./people.js');

// on peut importer plusieurs objets en utilisant les accolades

console.log(people);
console.log(ages);
// le require retourne un objet vide. donc xyz est vide. 
// node a des modules qui sont construit dans node on peut egalement les require
// par ex les os module 

const os = require('os');

console.log(os.platform(), os.homedir());