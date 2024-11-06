const {
  calculate_sum,
  calculate_sub,
  calculate_mul,
  calculate_div,
} = require("./calculate");

let a = 10;
let b = 10;

console.log("Main File is running");

calculate_sum(a, b);
calculate_sub(a, b);
calculate_mul(a, b);
calculate_div(a, b);
