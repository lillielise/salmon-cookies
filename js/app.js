'use strict';

// global DOM call
var salesTable = document.getElementById('sales-table');
var storeForm = document.getElementById('store-form');

// setup arrays
var storesHours = ['6am', '7am', '8am', '9am','10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var allStores = [];
var allStoresHourlyTotalsArray = [];
var hourlyTotals = [];
var grandTotal = 0;



// Store constructors
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

  this.render = function(){
    // create the row
    var trEl = document.createElement('tr');
    // start the row with the name
    var tdEl = document.createElement('td');
    // add content to the row
    tdEl.textContent = this.storeLocation;
    // append the content
    trEl.appendChild(tdEl);

    for (var i = 0; i < storesHours.length; i++){
      // create the table data
      tdEl = document.createElement('td');
      // give content to the table data
      tdEl.textContent = this.hourlySales[i];
      //append the table data
      trEl.appendChild(tdEl);
      // append the row to the table

    }
    // create the totals population
    tdEl = document.createElement('td');
    // add content to the totals
    tdEl.textContent = this.totalCookiesForTheDay;
    // append the totals
    trEl.appendChild(tdEl);

    // elink to the html
    salesTable.appendChild(trEl);

  };
  // pushing all data to the array
  allStores.push(this);
  allStoresHourlyTotalsArray.push(this.hourlySales);
}

// creating variables for new objects
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


// create function to add sum of all stores sales by hour
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
    thEl = document.createElement('th');
    thEl.textContent = storesHours[i];
    trEl.appendChild(thEl);

  }
  //create the total header
  thEl = document.createElement('th');
  thEl.textContent = 'Total';
  trEl.appendChild(thEl);
  salesTable.appendChild(trEl);

}

function makeFooterRow(){
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
  trEl.appendChild(tdEl);
  tfEl.appendChild(trEl);
  salesTable.appendChild(tfEl);
}


// This function is the event handler for store submission form
function handleStoreSubmit(event){

  event.preventDefault(); // prevents the page reload on a 'submit' event

  // target the input values to apply to constructor
  var storeLocation = event.target.storelocation.value;
  var minCustomers = event.target.mincustomers.value;
  var maxCustomers = event.target.maxcustomers.value;
  var averageCookieSales = event.target.averagecookies.value;

  // create new object with constructro
  new Store(storeLocation, minCustomers, maxCustomers, averageCookieSales);

  // empties the form fields after the data has been grabbed
  // event.target.storelocation.value = null;
  // event.target.mincustomers.value = null;
  // event.target.maxcustomers.value = null;
  // event.target.averagecookies.value = null;

  salesTable.innerHTML = '';

  makeHeaderRow();
  callAllFunctions();
  grandTotal = 0;
  sumHourlyTotals();
  makeFooterRow();

}

// Event listener for store submission form


// calling rest of functions
makeHeaderRow();
callAllFunctions();
sumHourlyTotals();
makeFooterRow();


storeForm.addEventListener('submit', handleStoreSubmit);

