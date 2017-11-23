'use strict';
var allProducts = [];
var productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'sweepers', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

function Product(name, path) {
  this.name = name;
  this.path = 'images/' + this.name + '.jpg';
  this.clicked = 0;
  this.votes = 0;
  allProducts.push(this);
}

(function() {
  for(var i in productNames){
    new Product(productNames[i]);
  }
})();

var tracker ={
  imagesEl: document.getElementById('images'),
  resultsEl: document.getElementById('results'),
  clickCount: 0,

  imageOne: document.createElement('img'),
  imageTwo: document.createElement('img'),
  imageThree: document.createElement('img'),

  getRandomIndex: function() {
    return Math.floor(Math.random() * allProducts.length);
  },

  displayImages: function() {
    var idOne = this.getRandomIndex();
    var idTwo = this.getRandomIndex();
    var idThree = this.getRandomIndex();

    if(idOne === idTwo || idOne === idThree || idTwo === idThree) {
      this.displayImages();
      return;
    }

    this.imageOne.src = allProducts[idOne].path;
    this.imageTwo.src = allProducts[idTwo].path;
    this.imageThree.src = allProducts[idThree].path;

    this.imageOne.id = allProducts[idOne].name;
    this.imageTwo.id = allProducts[idTwo].name;
    this.imageThree.id = allProducts[idThree].name;

    this.imagesEl.appendChild(this.imageOne);
    this.imagesEl.appendChild(this.imageTwo);
    this.imagesEl.appendChild(this.imageThree);
  },

onClick: function(event) {
    console.log(event.target.id);

    if(event.target.id === 'images') {
      return;
    } else {
      tracker.clickCount++;

      for(var i in allProducts) {
        if(event.target.id === allProducts[i].name) {
          allProducts[i].votes++;
        }
      }
      tracker.displayImages();
    }
    if (tracker.clickCount === 25){
      var ctx = document.getElementById('myChart');
      var options = {
        type: 'bar',
        data: {
          labels: productNames,
          datasets: [{
            label: 'Votes Tallied',
            data: allProducts.map(function(x) {return x.votes;}),
            backgroundColor: [
              'rgb(128, 0, 32)',
              'rgb(255, 0, 0)',
              'rgb(0, 255, 0)',
              'rgb(0, 0, 255)',
              'rgb(192, 192, 192)',
              'rgb(255, 255, 0)',
              'rgb(255, 0, 255)',
              'rgb(255, 0, 0)',
              'rgb(0, 255, 0)',
              'rgb(0, 0, 255)',
              'rgb(192, 192, 192)',
              'rgb(255, 255, 0)',
              'rgb(255, 0, 255)',
              'rgb(255, 0, 0)',
              'rgb(0, 255, 0)',
              'rgb(0, 0, 255)',
              'rgb(192, 192, 192)',
              'rgb(255, 255, 0)',
              'rgb(255, 0, 255)',
              'rgb(255, 0, 0)',
              'rgb(0, 255, 0)',
            ],
            borderColor: [
              'rgb(128, 0, 32)',
              'rgb(255, 0, 0)',
              'rgb(0, 255, 0)',
              'rgb(0, 0, 255)',
              'rgb(192, 192, 192)',
              'rgb(255, 255, 0)',
              'rgb(255, 0, 255)',
              'rgb(255, 0, 0)',
              'rgb(0, 255, 0)',
              'rgb(0, 0, 255)',
              'rgb(192, 192, 192)',
              'rgb(255, 255, 0)',
              'rgb(255, 0, 255)',
              'rgb(255, 0, 0)',
              'rgb(0, 255, 0)',
              'rgb(0, 0, 255)',
              'rgb(192, 192, 192)',
              'rgb(255, 255, 0)',
              'rgb(255, 0, 255)',
              'rgb(255, 0, 0)',
              'rgb(0, 255, 0)',
            ],
            borderWidth: 1
          },
          ]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      };
      var myChart = new Chart(ctx, options);
      console.log ('myChart', myChart);
      tracker.imagesEl.removeEventListener('click', tracker.onClick);
    }
    localStorage.setItem('allProducts', JSON.stringify(allProducts));
  }
};
tracker.imagesEl.addEventListener('click', tracker.onClick);
tracker.displayImages();
