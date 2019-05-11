//indicates that code should be executed in strict mode
'use strict';

// global DOM call for sales table and sales form
var salesTable = document.getElementById('sales-table');
var storeForm = document.getElementById('store-form');

// setup arrays
var storesHours = ['6am', '7am', '8am', '9am','10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

// hold all the instances of the stores
var allStores = [];
// an array that holds arrays for all the stores hours
var allStoresHourlyTotalsArray = [];
// an array with the totals for all stores each hour
var hourlyTotals = [];

var grandTotal = 0;



/// STORE CONSTRUCTOR ///
function Store(storeLocation, minCustomers, maxCustomers, averageCookieSales){
  this.storeLocation = storeLocation;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.averageCookieSales = averageCookieSales;
  this.customersEachHour = [];
  this.hourlySales = [];
  this.totalCookiesForTheDay = 0;
  // pushing the instance to the allStores array
  allStores.push(this);
  // pushing the array of hourly sales for this instance into the allStoresHourlyTotals array
  allStoresHourlyTotalsArray.push(this.hourlySales);
}



/// PROTOTYPE TIME ///

// prototype to generate a random customer number to call in hourlyCustomersCalculator function
Store.prototype.randomCustomers = function(min, max){
  // following line from MDN docs on Math.random
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// prototype to generate the hourly customers
Store.prototype.hourlyCustomersCalculator = function(){
  for (var i = 0; i < storesHours.length; i++){
    this.customersEachHour.push(this.randomCustomers(this.minCustomers, this.maxCustomers));
  }
};

// prototype to generate hourly sales using theHourlyCustomersCalculator
Store.prototype.hourlySalesCalculator = function(){
  this.hourlyCustomersCalculator();
  for (var i = 0; i < storesHours.length; i++){
    var oneHourOfCookies = Math.ceil(this.customersEachHour[i] * this.averageCookieSales);
    this.hourlySales.push(oneHourOfCookies);
    this.totalCookiesForTheDay += oneHourOfCookies;
  }

};

// prototype to render to the DOM
Store.prototype.render = function(){
  // create the row element
  var trEl = document.createElement('tr');
  // create the td element
  var tdEl = document.createElement('td');
  // add content to the td
  tdEl.textContent = this.storeLocation;
  // append the content
  trEl.appendChild(tdEl);

  for (var i = 0; i < storesHours.length; i++){
    // create the table data element
    tdEl = document.createElement('td');
    // give content to the td
    tdEl.textContent = this.hourlySales[i];
    //append the table data
    trEl.appendChild(tdEl);
  }

  // create the td element
  tdEl = document.createElement('td');
  // add the total of total cookies sold to the td
  tdEl.textContent = this.totalCookiesForTheDay;
  this.totalCookiesForTheDay = 0;
  // append the td
  trEl.appendChild(tdEl);

  // links the table to the html
  salesTable.appendChild(trEl);

};


/// NEW INSTANCES ///
new Store('First and Pike', 23, 65, 6.3);
new Store('SeaTac Airport', 3, 24, 1.2);
new Store('Seattle Center', 11, 38, 3.7);
new Store('Capitol Hill', 20, 38, 2.3);
new Store('Alki', 2, 16, 4.6);

// function to call all functions
function callAllFunctions (){
  for (var i = 0; i < allStores.length; i++){
    allStores[i].hourlySalesCalculator();
    allStores[i].render();
  }
}


// create function to add sum of all stores sales by hour and add to the grand total
function sumHourlyTotals(){
  for (var i = 0; i < storesHours.length; i++){
    var hourlySum = 0;
    for (var j = 0; j < allStores.length; j++){
      hourlySum += allStores[j].hourlySales[i];
    }
    hourlyTotals[i] = hourlySum;
    grandTotal += hourlySum;
  }
}

/// HEADER AND FOOTER ///
function makeHeaderRow(){
  // create the tr element
  var trEl = document.createElement('tr');
  // create the th element
  var thEl = document.createElement('th');
  // add content to the th elment
  thEl.textContent = 'Locations';
  // append the th element
  trEl.appendChild(thEl);


  // create the hours with a loop
  for (var i = 0; i < storesHours.length; i++){
    thEl = document.createElement('th');
    thEl.textContent = storesHours[i];
    trEl.appendChild(thEl);
  }

  // creat the th element for the total header
  thEl = document.createElement('th');
  thEl.textContent = 'Total';
  trEl.appendChild(thEl);
  salesTable.appendChild(trEl);

}


function makeFooterRow(){
  // tfoot is the parent of the tr element so you create it first
  var tfEl = document.createElement('tfoot');
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Total Per Hour';
  trEl.appendChild(tdEl);

  for (var i = 0; i < hourlyTotals.length; i++){
    tdEl = document.createElement('td');
    tdEl.textContent = hourlyTotals[i];
    trEl.appendChild(tdEl);


  }
  // create grand total header
  tdEl = document.createElement('td');
  tdEl.textContent = grandTotal;
  // set grand total to zero so it doesn't add to itself
  grandTotal = 0;
  trEl.appendChild(tdEl);
  tfEl.appendChild(trEl);
  salesTable.appendChild(tfEl);
}


// EVENT HANDLER ///
function handleStoreSubmit(event){

  event.preventDefault(); // prevents the page reload on a 'submit' event

  // capture the data from the form
  var storeLocation = event.target.storelocation.value;
  var minCustomers = event.target.mincustomers.value;
  var maxCustomers = event.target.maxcustomers.value;
  var averageCookieSales = event.target.averagecookies.value;

  // use data to create a new store instance
  new Store(storeLocation, minCustomers, maxCustomers, averageCookieSales);

  // repaint the page
  salesTable.innerHTML = '';

  makeHeaderRow();
  callAllFunctions();
  sumHourlyTotals();
  makeFooterRow();
}


// calling rest of functions for the original table
makeHeaderRow();
callAllFunctions();
sumHourlyTotals();
makeFooterRow();


/// EVENT LISTENER ///
storeForm.addEventListener('submit', handleStoreSubmit);

