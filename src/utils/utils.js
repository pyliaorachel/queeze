// Source: https://www.w3resource.com/javascript-exercises/javascript-array-exercise-17.php
function shuffle(arr) {
  arr = arr.slice();

  let ctr = arr.length;
  let temp, index;

  while (ctr > 0) {
    let index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arr[ctr];
    arr[ctr] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

module.exports = {
  shuffle,
};