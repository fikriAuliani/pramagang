//pemanggilan di terminal dengan menggunakan node (nama file), contoh node index.js
console.log("Hello World");

const {firstName, lastName} = require("./apps")
console.log(firstName);
console.log(lastName);
console.log(firstName+" "+lastName);