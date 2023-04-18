var events = [
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 240000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 250000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "New York",
    state: "New York",
    attendance: 257000,
    date: "06/01/2019",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 130000,
    date: "06/01/2017",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 140000,
    date: "06/01/2018",
  },
  {
    event: "ComicCon",
    city: "San Diego",
    state: "California",
    attendance: 150000,
    date: "06/01/2019",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 40000,
    date: "06/01/2017",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 45000,
    date: "06/01/2018",
  },
  {
    event: "HeroesCon",
    city: "Charlotte",
    state: "North Carolina",
    attendance: 50000,
    date: "06/01/2019",
  },
];

// Build dropdown for specific cities
function buildDropDown() {
  let dropdownMenu = document.getElementById("eventDropDown");
  dropdownMenu.innerHTML = "";
  let currentEvents = events;

  let cityNames = currentEvents.map(event => event.city);

  let citiesSet = new Set(cityNames);

  let distinctCities = [...citiesSet];

  const dropdownTemplate = document.getElementById("dropdownItemTemplate");

  // copy the template
  let dropdownItemNode = document.importNode(dropdownTemplate.content, true);

  // make our changes
  let dropdownItemLink = dropdownItemNode.querySelector("a");
  dropdownItemLink.innerText = "All Cities";
  dropdownItemLink.setAttribute("data-string", "All");

  // add our copy to the page
  dropdownMenu.appendChild(dropdownItemNode);

  for (let i = 0; i < distinctCities.length; i++) {
    // get the city name
    let cityName = distinctCities[i];

    // generate a dropdown element
    let itemNode = document.importNode(dropdownTemplate.content, true);
    let anchorTag = itemNode.querySelector("a");
    anchorTag.innerText = cityName;
    anchorTag.setAttribute("data-string", cityName);

    // append it to the dropdown menu
    dropdownMenu.appendChild(itemNode);
  }
  displayEventData(currentEvents);
  displayStats(currentEvents);
}

function displayEventData(currentEvents) {
  // get the table
  const eventTable = document.getElementById("eventTable")
  const template = document.getElementById("tableRowTemplate");

  eventTable.innerHTML = ''

  for (let i = 0; i < currentEvents.length; i++)
  {
    let event = currentEvents[i];

    let tableRow = document.importNode(template.content, true)

    tableRow.querySelector('[data-id="event"]').textContent = event.event;
    tableRow.querySelector('[data-id="city"]').textContent = event.city;
    tableRow.querySelector('[data-id="state"]').textContent = event.state;
    tableRow.querySelector('[data-id="attendance"]').textContent = event.attendance;
    tableRow.querySelector('[data-id="date"]').textContent = event.date;

    eventTable.appendChild(tableRow);
  }
  
}

function calculateStats(currentEvents) {
  let total = 0;
  let most = 0;
  let least = currentEvents[0].attendance;
  let average = 0;

  for (let i = 0; i < currentEvents.length; i++)
  {
    let currentAttendance = currentEvents[i].attendance;

    total += currentAttendance;

    if (currentAttendance > most)
    {
      most = currentAttendance;
    }

    if (currentAttendance < least)
    {
      least = currentAttendance;
    }
  }
  average = total / currentEvents.length;

  let stats = {
    total: total,
    average: average,
    most: most,
    least: least
  };

  return stats;
}

function displayStats(currentEvents) {

  let statistics = calculateStats(currentEvents);

  let total = document.getElementById('total').textContent = statistics.total.toLocaleString();
  let average = document.getElementById('average').textContent = Math.round(statistics.average).toLocaleString();
  let most = document.getElementById('most').textContent = statistics.most.toLocaleString();
  let least = document.getElementById('least').textContent = statistics.least.toLocaleString();

}