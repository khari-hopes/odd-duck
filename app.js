'use strict';

const imgVariable = {
  products: [
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
  new Product("pet sweep", "img/pet-sweep.jpg"),
  new Product("scissors", "img/scissors.jpg"),
  new Product("shark", "img/shark.jpg"),
  new Product("sweep", "img/sweep.png"),
  new Product("tautaun", "img/tauntaun.jpg"),
  new Product("unicorn", "img/unicorn.jpg"),
  new Product("water-can", "img/water-can.jpg"),
  new Product("wine-glass", "img/wine-glass.jpg"),
],
  imageContainer: document.getElementById("images"),
  resultsContainer: document.getElementById("results"),
  myChart: null,
  previouslyShownProduct: [],
  currentlyShownProduct: [],
};

imgVariable.imageContainer.addEventListener("click", handleClickProduct);

function Product(productName, filePath) {
  this.productName = productName;
  this.filePath = filePath;
  this.lastClicked = null;
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
  imgVariable.imageContainer.innerHTML = '';

  imgVariable.previouslyShownProduct = imgVariable.currentlyShownProduct;
  imgVariable.currentlyShownProduct = [];

  while (imgVariable.currentlyShownProduct.length < 3) {
    const randomInt = getRandomInt(0, imgVariable.products.length);
    const randomProduct = imgVariable.products[randomInt];
    if (
      !imgVariable.currentlyShownProduct.includes(randomProduct) &&
      !imgVariable.previouslyShownProduct.includes(randomProduct)
    ) {
      imgVariable.currentlyShownProduct.push(randomProduct);
    }
  }

  for (let i = 0; i < imgVariable.currentlyShownProduct.length; i++) {
    imgVariable.currentlyShownProduct[i].views++;
    imgVariable.currentlyShownProduct[i].render();
  }
}

getRandomImg();

function handleClickProduct(event) {
  event.preventDefault();

  const target = event.target.alt;

  for (let i = 0; i < imgVariable.products.length; i++) {
    if (target === imgVariable.products[i].productName) {
      imgVariable.products[i].votes++;
    }
  }

  getRandomImg();
  renderResults();
}


  function renderResults() {
    imgVariable.resultsContainer.innerHTML = "";
    renderChart();
    const resultsElm = document.createElement("ul");

    for (let i = 0; i < imgVariable.products.length; i++) {
      const product = imgVariable.products[i];

      const resultsItemElm = document.createElement("li");
      resultsItemElm.textContent = `${product.productName} had ${product.votes} votes and was seen ${product.views} times.`;
      resultsElm.appendChild(resultsItemElm);
    }
    
    imgVariable.resultsContainer.appendChild(resultsElm);
  }

  function renderChart() {
    const ctx = document.getElementById("myChart");
  
    const labels = [];
    const votes = [];
    const views = [];
  
    for (let i = 0; i < imgVariable.products.length; i++) {
      const product = imgVariable.products[i];
  
      labels.push(product.productName);
      votes.push(product.votes);
      views.push(product.views);
      
      console.log("Labels:", labels);
      console.log("Votes:", votes);
      console.log("Views:", views);
    }
  
    if (imgVariable.myChart) {
      imgVariable.myChart.clear();
      imgVariable.myChart.destroy();
    }
  
    imgVariable.myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "# of Votes",
            data: votes,
            borderWidth: 1,
          },
          {
            label: "# of Views",
            data: views,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}