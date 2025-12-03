var sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
  var result = 0;
  var count = 1;
  while (count <= n) {
    result += count;
    count++;
  }
  return result;
};

var sum_to_n_c = function (n) {
  return Array.from({ length: n + 1 })
    .map((_, i) => i)
    .reduce((a, b) => a + b, 0);
};

console.log(sum_to_n_a(5));
console.log(sum_to_n_b(5));
console.log(sum_to_n_c(5));
