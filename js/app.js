var firstAndPikeHourlySales = document.getElementById('first-and-pike-hourly-sales');

var storeHours = ['6am', '7am', '8am', '9am','10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// JAVASCRIPT OBJECTS

// Object literal notation
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

var seaTacAirport = {
  minCustomers: ,
  maxCustomers: 65,
  averageCookieSales: 6.3,
  hourlySales: [],
}

firstAndPike.hourlySalesCalculator();

firstAndPike.render();

