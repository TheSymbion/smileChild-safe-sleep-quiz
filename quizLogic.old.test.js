const { isCorrect, calculateScore, getGrade } = require('./quizLogic')
   /*

That line is the JavaScript version of Python's `from quizLogic import isCorrect, calculateScore, getGrade`.

Then write `console.log` tests for all three functions — at least 2 tests each. Run it with:
node src/quizLogic.test.js


console.log("Testing isCorrect function:");
console.log(isCorrect("A", "A") === true); // Should print true
console.log(isCorrect("B", "A") === false); // Should print true    

console.log("\nTesting calculateScore function:");
console.log(calculateScore(8, 10) === 80);
console.log(calculateScore(0, 0) === 0); // Should print true

console.log("\nTesting getGrade function:");
console.log(getGrade(95) === "A");  
console.log(getGrade(85) === "B");
console.log(getGrade(75) === "C");
console.log(getGrade(65) === "D");
*/


console.log("--- Testing isCorrect ---");
console.log(`True/True match: ${isCorrect(true, true)}`); // Should be true
console.log(`True/False match: ${isCorrect(true, false)}`); // Should be false

console.log("\n--- Testing calculateScore ---");
console.log(`7/10 score: ${calculateScore(7, 10)}%`); // Should be 70%
console.log(`0/0 guard: ${calculateScore(0, 0)}%`);   // Should be 0%

console.log("\n--- Testing getGrade ---");
console.log(`100 percent: ${getGrade(100)}`); // Should be "Perfect!"
console.log(`40 percent: ${getGrade(40)}`);   // Should be "Keep learning"

