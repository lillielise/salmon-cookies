var firstAndPikeHourlySales = document.getElementById('first-and-pike-hourly-sales');
var seaTacAirportHourlySales = document.getElementById('sea-tac-airport-hourly-sales');
var seattleCenterHourlySales = document.getElementById('seattle-center-hourly-sales');
var capitolHillHourlySales = document.getElementById('capitol-hill-hourly-sales');
var alkiHourlySales = document.getElementById('alki-hourly-sales');

var storeHours = ['6am', '7am', '8am', '9am','10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// JAVASCRIPT OBJECTS

// First and Pike Store
var firstAndPike = {
  minCustomers: 23,
  maxCustomers: 65,
  averageCookieSales: 6.3,
  hourlySales: [],
  randomCustomers: function(){
    return Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers;
  },
  hourlySalesCalculator: function(){
    for (var i = 0; i < storeHours.length; i++){
      this.hourlySales.push((Math.ceil(this.randomCustomers() * this.averageCookieSales)));
    }
  },
  render: function(){
    for (var i = 0; i < storeHours.length; i++){
      // create element
      var liEl = document.createElement('li');


      // give content
      liEl.textContent = storeHours[i] + ': ' + this.hourlySales[i] + ' cookies';


      // append to dom
      firstAndPikeHourlySales.appendChild(liEl);

    }
  }
};


// SeaTac Airpot Store
var seaTacAirport = {
  minCustomers: 3,
  maxCustomers: 24,
  averageCookieSales: 1.2,
  hourlySales: [],
  randomCustomers: function(){
    return Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers;
  },
  hourlySalesCalculator: function(){
    for (var i = 0; i < storeHours.length; i++){
      this.hourlySales.push((Math.ceil(this.randomCustomers() * this.averageCookieSales)));
    }
  },
  render: function(){
    for (var i = 0; i < storeHours.length; i++){
      // create element
      var liEl = document.createElement('li');


      // give content
      liEl.textContent = storeHours[i] + ': ' + this.hourlySales[i] + ' cookies';


      // append to dom
      seaTacAirportHourlySales.appendChild(liEl);
    }

  }
};

var seattleCenter = {
  minCustomers: 11,
  maxCustomers: 38,
  averageCookieSales: 3.7,
  hourlySales: [],
  randomCustomers: function(){
    return Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers;
  },
  hourlySalesCalculator: function(){
    for (var i = 0; i < storeHours.length; i++){
      this.hourlySales.push((Math.ceil(this.randomCustomers() * this.averageCookieSales)));
    }
  },
  render: function(){
    for (var i = 0; i < storeHours.length; i++){
      // create element
      var liEl = document.createElement('li');


      // give content
      liEl.textContent = storeHours[i] + ': ' + this.hourlySales[i] + ' cookies';


      // append to dom
      seattleCenterHourlySales.appendChild(liEl);

    }
  }
};

var capitolHill = {
  minCustomers: 20,
  maxCustomers: 38,
  averageCookieSales: 2.3,
  hourlySales: [],
  randomCustomers: function(){
    return Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers;
  },
  hourlySalesCalculator: function(){
    for (var i = 0; i < storeHours.length; i++){
      this.hourlySales.push((Math.ceil(this.randomCustomers() * this.averageCookieSales)));
    }
  },
  render: function(){
    for (var i = 0; i < storeHours.length; i++){
      // create element
      var liEl = document.createElement('li');


      // give content
      liEl.textContent = storeHours[i] + ': ' + this.hourlySales[i] + ' cookies';


      // append to dom
      capitolHillHourlySales.appendChild(liEl);

    }
  }
};

var alki = {
  minCustomers: 2,
  maxCustomers: 16,
  averageCookieSales: 4.6,
  hourlySales: [],
  randomCustomers: function(){
    return Math.random() * (this.maxCustomers - this.minCustomers) + this.minCustomers;
  },
  hourlySalesCalculator: function(){
    for (var i = 0; i < storeHours.length; i++){
      this.hourlySales.push((Math.ceil(this.randomCustomers() * this.averageCookieSales)));
    }
  },
  render: function(){
    for (var i = 0; i < storeHours.length; i++){
      // create element
      var liEl = document.createElement('li');


      // give content
      liEl.textContent = storeHours[i] + ': ' + this.hourlySales[i] + ' cookies';


      // append to dom
      alkiHourlySales.appendChild(liEl);

    }
  }
};


firstAndPike.hourlySalesCalculator();
seaTacAirport.hourlySalesCalculator();
seattleCenter.hourlySalesCalculator();
capitolHill.hourlySalesCalculator();
alki.hourlySalesCalculator();



firstAndPike.render();
seaTacAirport.render();
seattleCenter.render();
capitolHill.render();
alki.render();

