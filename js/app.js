'use strict';
var allStores = [];
var salesTable = document.getElementById('sales-table');

var storesHours = ['6am', '7am', '8am', '9am','10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];



// store constructors
function Store(storeLocation, minCustomers, maxCustomers, averageCookieSales){
  this.storeLocation = storeLocation;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.averageCookieSales = averageCookieSales;
  this.customersEachHour = [];
  this.hourlySales = [];
  this.totalCookiesForTheDay = 0;
  this.randomCustomers = function(min, max){
    // following line from MDN docs on Math.random
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  this.hourlyCustomersCalculator = function(){
    for (var i = 0; i < storesHours.length; i++){
      this.customersEachHour.push(this.randomCustomers(this.minCustomers, this.maxCustomers));
    }
  };
  this.hourlySalesCalculator = function(){
    this.hourlyCustomersCalculator();
    for (var i = 0; i < storesHours.length; i++){
      var oneHourOfCookies = Math.ceil(this.customersEachHour[i] * this.averageCookieSales);
      this.hourlySales.push(oneHourOfCookies);
      this.totalCookiesForTheDay += oneHourOfCookies;
    }
  };

  this.makeTable = function(){
    // create the row
    var trEl = document.createElement('tr');
    // start the array with the name
    var tdEl = document.createElement('td');
    tdEl.textContent = this.storeLocation;
    trEl.appendChild(tdEl);
    for (var i = 0; i < storesHours.length; i++){
      // create, content, append first cell
      var tdEl = document.createElement('td');
      tdEl.textContent = this.hourlySales[i];
      trEl.appendChild(tdEl);
      // append the row to the table
      salesTable.appendChild(trEl);
    }
    // create the totals population
    var tdEl = document.createElement('td');
    tdEl.textContent = this.totalCookiesForTheDay;
    trEl.appendChild(tdEl);
  };
  allStores.push(this);
}

// creating variables for new objects
var firstAndPike = new Store('First and Pike', 23, 65, 6.3);
var seaTacAirport = new Store('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 38, 3.7);
var capitolHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);



// create header for table
function makeHeaderRow(){
  // create the row
  var trEl = document.createElement('tr');
  // create the location header
  var thEl = document.createElement('th');
  thEl.textContent = 'Locations';
  trEl.appendChild(thEl);

  for (var i = 0; i < storesHours.length; i++){
    // create the hours with a loop
    var thEl = document.createElement('th');
    thEl.textContent = storesHours[i];
    trEl.appendChild(thEl);
    // append the row to the table
    salesTable.appendChild(trEl);
  }
  //create the total header
  var thEl = document.createElement('th');
  thEl.textContent = 'Total';
  trEl.appendChild(thEl);

}

// var allHourlyTotals = [];
// // bottom row
// function makeFooter(){
//   for (var i = 0; i < storesHours.length; i++){
//     var allStoreHourlyTotals = firstAndPike.hourlySales[i] + seaTacAirport.hourlySales[i] + seattleCenter.hourlySales[i] + capitolHill.hourlySales[i] + alki.hourlySales[i];
//     allStoreHourlyTotals.push(allHourlyTotals);
//   }
// }


firstAndPike.hourlySalesCalculator();
seaTacAirport.hourlySalesCalculator();
seattleCenter.hourlySalesCalculator();
capitolHill.hourlySalesCalculator();
alki.hourlySalesCalculator();


makeHeaderRow();


firstAndPike.makeTable();
seaTacAirport.makeTable();
seattleCenter.makeTable();
capitolHill.makeTable();
alki.makeTable();
