'use strict';

const products = [
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
];

let myChart = null;

let imgVariable = {
  products: [],
  imageContainer: document.getElementById("images"),
  resultsContainer: document.getElementById("results"),
  currentlyShownProducts: [],
  previouslyShownproducts: [],
};

imgVariable.imageContainer.addEventListener("click", handleClickProduct);

function Product(productName, filePath, views = 0, votes = 0) {
  this.productName = productName;
  this.filePath = filePath;
  this.views = views;
  this.votes = votes;
}

Product.prototype.render = function () {
  const imgElm = document.createElement("img");
  imgElm.src = this.filePath;
  imgElm.alt = this.productName;

  imgVariable.imageContainer.appendChild(imgElm);
};


getLocalStorage();
renderProducts();
renderResults();

function renderProducts() {
  imgVariable.imageContainer.innerHTML = "";

  imgVariable.previouslyShownproducts = [...imgVariable.currentlyShownProducts];
  imgVariable.currentlyShownProducts = [];

  while (imgVariable.currentlyShownProducts.length < 3) {
    const randomInt = getRandomInt(0, products.length);
    const randomProduct = products[randomInt];
    if (
      !imgVariable.currentlyShownProducts.includes(randomProduct) &&
      !imgVariable.previouslyShownproducts.includes(randomProduct)
    ) {
      imgVariable.currentlyShownProducts.push(randomProduct);
    }
  }

  for (let i = 0; i < imgVariable.currentlyShownProducts.length; i++) {
    imgVariable.currentlyShownProducts[i].views++;
    imgVariable.currentlyShownProducts[i].render();
  }
}

function handleClickProduct(event) {
  event.preventDefault();

  const target = event.target.alt;

  for (let i = 0; i < imgVariable.products.length; i++) {
    if (target === imgVariable.products[i].productName) {
      imgVariable.products[i].votes++;
    }
  }

  setLocalStorage();
  renderProducts();
  renderResults();

}

function renderResults() {
  imgVariable.resultsContainer.innerHTML = ""; 
  renderChart();
  const resultsElm = document.createElement("ul");

  for (let i = 0; i < imgVariable.products.length; i++) {
    const product = imgVariable.products[i];

    const resultItemElm = document.createElement("li");
    resultItemElm.textContent = `${product.productName} was seen ${product.views} times and was clicked ${product.votes} times.`;
    resultsElm.appendChild(resultItemElm);
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
  }

  if (myChart) {
    myChart.remove();
    myChart.destroy(); 
  }

  myChart = new Chart(ctx, {
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
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

function setLocalStorage() {
  localStorage.setItem("imgVariable", JSON.stringify(imgVariable)); 
}

function getLocalStorage() {
  if (localStorage.imgVariable) {
    const storedData = JSON.parse(localStorage.imgVariable);

    for (let i = 0; i < storedData.products.length; i++) {
      const product = storedData.products[i];
      const newProduct = new Product(
        product.productName,
        product.filePath,
        product.views,
        product.votes
      );

      imgVariable.products.push(newProduct);
    }
  } else {
    for (let i = 0; i < products.length; i++) {
      imgVariable.products.push(products[i]);
    }
  }
}
