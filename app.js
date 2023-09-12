'use strict';

const imgVariable = {
  imgArray: [
    new Product("bag", "img/bag.jpg"),
    new Product("banana", "img/banana.jpg"),
    new Product("bathroom", "img/bathroom.jpg"),
    new Product("boots", "img/boots.jpg"),
    new Product("breakfast", "img/breakfast.jpg"),
  new Product("bubblegum", "img/bubblegum.jpg"),
  new Product("chair", "img/chair.jpg"),
  new Product("cthulhu", "img/cthulhu.jpg"),
  new Product("dog-duck", "img/dog-duck.jpg"),
  new Product("dragon", "img/dragon.jpg"),
  new Product("pen", "img/pen.jpg"),
  new Product("pet-sweet", "img/pet-sweet.jpg"),
  new Product("scissors", "img/scissors.jpg"),
  new Product("shark", "img/shark.jpg"),
  new Product("sweep", "img/sweep.jpg"),
  new Product("tautaun", "img/tautaun.jpg"),
  new Product("unicorn", "img/unicorn.jpg"),
  new Product("water-can", "img/water-can.jpg"),
  new Product("wine-glass", "img/wine-glass.jpg"),
],
imageContainer: document.getElementById("images"), 
resultsContainer: document.getElementById("results"), 
buttonContainer: document.getElementById("button"),
};

function Product(filePath, productName) {
  this.productName = productName;
this.filePath = filePath;
this.votes = 0;
this.views = 0;
}

Product.prototype.render = function () {
const imgElm = document.createElement("img");
imgElm.src = this.filePath;
imgElm.alt = this.productName;
imgVariable.imageContainer.appendChild(imgElm);
};

function getRandomImg() {
imgVariable.imageContainer.innerHTML = null;

let newArray = [];

for (let i = 0; i < 3; i++) {
  let randNum = Math.floor(Math.random() * imgVariable.imgArray.length);
  let randomImg = imgVariable.imgArray[randNum];
  
  while (newArray.includes(randomImg)) {
    randNum = Math.floor(Math.random() * imgVariable.imgArray.length);
    randomImg = imgVariable.imgArray[randNum];
  }

  randomImg.views++;
  randomImg.render();
  newArray.push(randomImg);
}

return newArray;
}

const randomImages = getRandomImg();
console.log(randomImages);

function handleClickImg(event) {
event.preventDefault();
const target = event.target.alt;

for (let i = 0; i < imgVariable.imgArray.length; i++) {
  if (imgVariable.imgArray[i].productName === target) {
    imgVariable.imgArray[i].votes++;
  }
}

getRandomImg();
}

imgVariable.imageContainer.addEventListener("click", handleClickImg);



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}