let userInfo = {
  // Basic user info
  name: {
    first: Cookies.get('first_name'),
    last: Cookies.get('last_name')
  },
  university: Cookies.get('university'),
  major: Cookies.get('major'),
  answers: {
    living: {
      location: Cookies.get('living_location'),
      movein: Cookies.get('living_movein'),
      roommate: Cookies.get('living_roommate'),
      car: Cookies.get('living_car'),
      food: Cookies.get('living_food'),
      weather: {
        sunny: Cookies.get('living_weather_sunny'),
        rainy: Cookies.get('living_weather_rainy'),
        snowy: Cookies.get('living_weather_snowy'),
        windy: Cookies.get('living_weather_windy')
      }
    }
  }
}

if (userInfo.name.first == undefined || userInfo.name.last == undefined || userInfo.university == undefined || userInfo.major == undefined || userInfo.answers.living.location == undefined || userInfo.answers.living.movein == undefined || userInfo.answers.living.roommate == undefined || userInfo.answers.living.car == undefined || userInfo.answers.living.food == undefined || userInfo.answers.living.weather.sunny == undefined || userInfo.answers.living.weather.rainy == undefined || userInfo.answers.living.weather.snowy == undefined || userInfo.answers.living.weather.windy == undefined) {
  alert('You must fully complete the survey before accessing the dashboard!');
  window.location.href = "../";
}

let checklist = {
  sample: {
    sample: {
      status: "complete",
      date: "2023-02-19"
    }
  },
  research: {
    bed_size: JSON.parse(Cookies.get('check_bed_size')),
    apt_furnished: JSON.parse(Cookies.get('check_apt_furnished')),
    furniture_delivery: JSON.parse(Cookies.get('check_furniture_delivery')), 
    package_delivery: JSON.parse(Cookies.get('check_package_delivery')),
    parking_info: JSON.parse(Cookies.get('check_parking_info')),
    supply_list: JSON.parse(Cookies.get('check_supply_list')), 
    scholarships: JSON.parse(Cookies.get('check_scholarhips')),
  },
  supplies: {
    bedding: JSON.parse(Cookies.get('buy_bedding')),
    school_supplies: JSON.parse(Cookies.get('buy_school_supplies')),
    storage: JSON.parse(Cookies.get('buy_storage')),
    decorations: JSON.parse(Cookies.get('buy_decorations')),
    furniture: JSON.parse(Cookies.get('buy_furniture')),
    kitchen_supplies: JSON.parse(Cookies.get('buy_kitchen_supplies')),
    parking_pass: JSON.parse(Cookies.get('buy_parking')),
    winter_coat: JSON.parse(Cookies.get('buy_winter_coat')),
    snow_pants: JSON.parse(Cookies.get('buy_snow_pants')),
    gloves: JSON.parse(Cookies.get('buy_gloves')),
  },
  packing: {
    sunscreen: JSON.parse(Cookies.get('pack_sunscreen')),
    school_clothes: JSON.parse(Cookies.get('pack_school_clothes')),
    formal_clothes: JSON.parse(Cookies.get('pack_formal_clothes')),
    light_clothes: JSON.parse(Cookies.get('pack_light_clothes')),
    sandals: JSON.parse(Cookies.get('pack_sandals')),
    hat: JSON.parse(Cookies.get('pack_hat')),
    sunglasses: JSON.parse(Cookies.get('pack_sunglasses')),
    jacket: JSON.parse(Cookies.get('pack_jacket')),
    boots: JSON.parse(Cookies.get('pack_boots')),
    backpack: JSON.parse(Cookies.get('pack_backpack')),
    appliances: JSON.parse(Cookies.get('pack_appliances')),
  },
  other: {
    register: JSON.parse(Cookies.get('register_classes')), 
    pay_tuition: JSON.parse(Cookies.get('pay_tuition/fees')), 
    contact_roommate: JSON.parse(Cookies.get('contact_roommate')), 
    meet_roommate: JSON.parse(Cookies.get('meet_roommate')), 
    budget_food: JSON.parse(Cookies.get('budget_food')), 
    budget_living_expenses: JSON.parse(Cookies.get('budget_living_expenses')), 
  }
}

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

// var fs = require ('fs');
// var data = 'words';
// fs.write('message.txt', data, 'a');

function createCookie(name,value,days) {
  if (days) {
      var date = new Date();
      date.setTime(date.getTime()+(days*24*60*60*1000));
      var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}
function eraseCookie(name) {
  createCookie(name,"",-1);
}

function downloadData() {
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(checklist));
  var dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `${userInfo.name.last}_${userInfo.name.first}_Checklist.json`);
  dlAnchorElem.click();

  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) eraseCookie(cookies[i].split("=")[0]);

  window.location.href = "../";
}


// Put data on page
document.querySelector('#name').textContent = userInfo.name.first + ' ' + userInfo.name.last;

document.querySelector('#university').textContent = userInfo.university;

document.querySelector('#major').textContent = userInfo.major;

if(userInfo.answers.living.location == 'home')
{
  document.querySelector('#location').textContent = toTitleCase(userInfo.answers.living.location);
}

else if (userInfo.answers.living.location == 'dorm')
{
  document.querySelector('#location').textContent = toTitleCase(userInfo.answers.living.location);
}

else if (userInfo.answers.living.location == 'apt/house')
{
  document.querySelector('#location').textContent = toTitleCase(userInfo.answers.living.location);
}
else
{
  console.log("Error defining location");
}

var countdown = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
  var countDownDate = new Date(userInfo.answers.living.movein).getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  if (days < 10)
  {
    days = "0" + days;
  }
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (hours < 10) {
    hours = "0" + hours;
  }
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  // Display the result in the element with id="demo"
  document.querySelector("#countdown").textContent = days + ":" + hours + ":"
  + minutes + ":" + seconds + "";

  // If the count down is finished, show 00
  if (distance < 0) {
    clearInterval(countdown);
    document.querySelector("#countdown").textContent = "00:00:00:00";
  }
}, 1000);

// Read in research checklist
// date in two weeks
var dateTwoWeeks = new Date();
dateTwoWeeks.setDate(dateTwoWeeks.getDate() + 14);

// for all items in research
for (var item in checklist.research)
{
  console.log(item, checklist.research[item]);
  let listItem = document.createElement("li");
  let itemCheckbox = document.createElement("input");
  let itemLabel = document.createElement("label");
  let itemSpan = document.createElement("span");
  let itemSpanText = document.createTextNode(toTitleCase(item.replaceAll('_', ' ')));
  itemSpan.appendChild(itemSpanText);
  itemLabel.appendChild(itemSpan);
  itemCheckbox.setAttribute('type', 'checkbox');
  itemCheckbox.setAttribute('id', item);
  itemCheckbox.setAttribute('data-item-due', checklist.research[item].date);
  itemCheckbox.setAttribute('data-item-category', 'research');
  listItem.appendChild(itemCheckbox);
  listItem.appendChild(itemLabel);

  var itemDate;
  if (checklist.research[item].date == undefined)
  {
    checklist.research[item].date = Date.now();
  } else {
    itemDate = new Date(checklist.research[item].date);
  }


  // if item is complete
  if (checklist.research[item].status == "complete")
  {
    // check the box
    itemCheckbox.checked = true;
    // move item to completd list
    document.querySelector('#research-complete-collapse .accordion-body ul').appendChild(listItem);
  }
  // if item is incomplete
  else if (checklist.research[item].status == "incomplete")
  {
    // uncheck the box
    itemCheckbox.checked = false;
    // check date
    if (itemDate < Date.now())
    {
      // if date is past due, add item to late list
      document.querySelector('#research-late-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'late');
    }
    // if date is over 2 weeks away, add item to future list
    else if (itemDate > dateTwoWeeks)
    {
      document.querySelector('#research-future-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'future');
    }
    // if date is under 2 weeks away, add item to current list
    else if (itemDate < dateTwoWeeks)
    {
      document.querySelector('#research-current-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'current');
    }
    // if date is not defined
    else
    {
      // place item in current list
      document.querySelector('#research-current-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'current');
    }
  }
  // if item is not defined
  else
  {
    // log error
    // console.log("Error defining research item", item);
  }
}

// for all items in supplies
for (var item in checklist.supplies)
{
  console.log(item, checklist.supplies[item]);
  let listItem = document.createElement("li");
  let itemCheckbox = document.createElement("input");
  let itemLabel = document.createElement("label");
  let itemSpan = document.createElement("span");
  let itemSpanText = document.createTextNode(toTitleCase(item.replaceAll('_', ' ')));
  itemSpan.appendChild(itemSpanText);
  itemLabel.appendChild(itemSpan);
  itemCheckbox.setAttribute('type', 'checkbox');
  itemCheckbox.setAttribute('id', item);
  itemCheckbox.setAttribute('data-item-due', checklist.supplies[item].date);
  itemCheckbox.setAttribute('data-item-category', 'supplies');
  listItem.appendChild(itemCheckbox);
  listItem.appendChild(itemLabel);

  var itemDate;
  if (checklist.supplies[item].date == undefined)
  {
    checklist.supplies[item].date = Date.now();
  } else {
    itemDate = new Date(checklist.supplies[item].date);
  }

  // if item is complete
  if (checklist.supplies[item].status == "complete")
  {
    // check the box
    itemCheckbox.checked = true;
    // move item to completd list
    document.querySelector('#supplies-complete-collapse .accordion-body ul').appendChild(listItem);
  }
  // if item is incomplete
  else if (checklist.supplies[item].status == "incomplete")
  {
    // uncheck the box
    itemCheckbox.checked = false;
    // check date
    if (itemDate < Date.now())
    {
      // if date is past due, add item to late list
      document.querySelector('#supplies-late-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'late');

    }
    // if date is over 2 weeks away, add item to future list
    else if (itemDate > dateTwoWeeks)
    {
      document.querySelector('#supplies-future-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'future');
    }
    // if date is under 2 weeks away, add item to current list
    else if (itemDate < dateTwoWeeks)
    {
      document.querySelector('#supplies-current-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'current');
    }
    // if date is not defined
    else
    {
      // place item in current list
      document.querySelector('#supplies-current-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'current');

    }
  }
  // if item is not defined
  else
  {
    // log error
    console.log("Error defining research item", item);
  }
}

// for all items in packing
for (var item in checklist.packing)
{
  console.log(item, checklist.packing[item]);
  let listItem = document.createElement("li");
  let itemCheckbox = document.createElement("input");
  let itemLabel = document.createElement("label");
  let itemSpan = document.createElement("span");
  let itemSpanText = document.createTextNode(toTitleCase(item.replaceAll('_', ' ')));
  itemSpan.appendChild(itemSpanText);
  itemLabel.appendChild(itemSpan);
  itemCheckbox.setAttribute('type', 'checkbox');
  itemCheckbox.setAttribute('id', item);
  itemCheckbox.setAttribute('data-item-due', checklist.packing[item].date);
  itemCheckbox.setAttribute('data-item-category', 'packing');
  listItem.appendChild(itemCheckbox);
  listItem.appendChild(itemLabel);

  var itemDate;
  if (checklist.packing[item].date == undefined)
  {
    checklist.packing[item].date = Date.now();
  } else {
    itemDate = new Date(checklist.packing[item].date);
  }

  // if item is complete
  if (checklist.packing[item].status == "complete")
  {
    // check the box
    itemCheckbox.checked = true;
    // move item to completd list
    document.querySelector('#packing-complete-collapse .accordion-body ul').appendChild(listItem);
  }
  // if item is incomplete
  else if (checklist.packing[item].status == "incomplete")
  {
    // uncheck the box
    itemCheckbox.checked = false;
    // check date
    if (itemDate < Date.now())
    {
      // if date is past due, add item to late list
      document.querySelector('#packing-late-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'late');
    }
    // if date is over 2 weeks away, add item to future list
    else if (itemDate > dateTwoWeeks)
    {
      document.querySelector('#packing-future-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'future');
    }
    // if date is under 2 weeks away, add item to current list
    else if (itemDate < dateTwoWeeks)
    {
      document.querySelector('#packing-current-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'current');
    }
    // if date is not defined
    else
    {
      // place item in current list
      document.querySelector('#packing-current-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'current');
    }
  }
  // if item is not defined
  else
  {
    // log error
    console.log("Error defining packing item", item);
  }
}

// for all items in other
for (var item in checklist.other)
{
  console.log(item, checklist.other[item]);
  let listItem = document.createElement("li");
  let itemCheckbox = document.createElement("input");
  let itemLabel = document.createElement("label");
  let itemSpan = document.createElement("span");
  let itemSpanText = document.createTextNode(toTitleCase(item.replaceAll('_', ' ')));
  itemSpan.appendChild(itemSpanText);
  itemLabel.appendChild(itemSpan);
  itemCheckbox.setAttribute('type', 'checkbox');
  itemCheckbox.setAttribute('id', item);
  itemCheckbox.setAttribute('data-item-due', checklist.other[item].date);
  itemCheckbox.setAttribute('data-item-category', 'other');
  listItem.appendChild(itemCheckbox);
  listItem.appendChild(itemLabel);

  var itemDate;
  if (checklist.other[item].date == undefined)
  {
    checklist.other[item].date = Date.now();
  } else {
    itemDate = new Date(checklist.other[item].date);
  }

  // if item is complete
  if (checklist.other[item].status == "complete")
  {
    // check the box
    itemCheckbox.checked = true;
    // move item to completd list
    document.querySelector('#other-complete-collapse .accordion-body ul').appendChild(listItem);
  }
  // if item is incomplete
  else if (checklist.other[item].status == "incomplete")
  {
    // uncheck the box
    itemCheckbox.checked = false;
    // check date
    if (itemDate < Date.now())
    {
      // if date is past due, add item to late list
      document.querySelector('#other-late-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'late');
    }
    // if date is over 2 weeks away, add item to future list
    else if (itemDate > dateTwoWeeks)
    {
      document.querySelector('#other-future-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'future');
    }
    // if date is under 2 weeks away, add item to current list
    else if (itemDate < dateTwoWeeks)
    {
      document.querySelector('#other-current-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'current');
    }
    // if date is not defined
    else
    {
      // place item in current list
      document.querySelector('#other-current-collapse .accordion-body ul').appendChild(listItem);
      itemCheckbox.setAttribute('data-item-urgency', 'current');
    }
  }
  // if item is unrelated
  else
  {
    // log error
    console.log("Error defining research item", item);
  }
}

// add event listener for each checkbox
var checkboxes = document.querySelectorAll('input[type=checkbox]');
for (var i = 0; i < checkboxes.length; i++)
{
  checkboxes[i].addEventListener('change', function() {
    // if checkbox is checked
    if (this.checked) {
      console.log(this.dataset.itemsCategory);
      // move item to completed list
      document.querySelector(`#${this.dataset.itemCategory}-complete-collapse .accordion-body ul`).appendChild(this.parentNode);
      // change status to complete
      Cookies.set(this.id, `{"status": "complete", "due": "${this.dataset.itemDue}"}`, { expires: 365 });
      // update checklist status based on cookie value
      if (Cookies.get(this.id)) {
        checklist.supplies[this.id] = JSON.parse(Cookies.get(this.id));
      }
      // log change
      console.log(this.id, 'changed to complete', JSON.parse(Cookies.get(this.id)));
    }
    // if checkbox is unchecked
    else {
      // move item to incomplete list
      document.querySelector(`#${this.dataset.itemCategory}-${this.dataset.itemUrgency}-collapse .accordion-body ul`).appendChild(this.parentNode);
      // change status to incomplete
      Cookies.set(this.id, `{"status": "incomplete", "due": "${this.dataset.itemDue}"}`, { expires: 365 });
      // update checklist status based on cookie value
      if (Cookies.get(this.id)) {
        checklist.supplies[this.id] = JSON.parse(Cookies.get(this.id));
      }
      // log change
      console.log(this.id, 'changed to incomplete', JSON.parse(Cookies.get(this.id)));
    }
  });
}