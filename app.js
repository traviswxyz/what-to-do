const activities = ["skiing", "biking", "kayaking", "running", "walking", "skating", "surfing", "swimming"];
const cities = ["New York City", "Washington, DC", "Dubai", "Paris", "Tokyo", "Rio de Janeiro", "Mumbai", "Amsterdam"];
const foods = ["lasagna", "steak", "hamburger", "sushi", "salad", "mangos", "tacos", "hummus"];

const list = document.getElementById('list');
const choice = document.createElement("li");
const btn = document.getElementById("btn");
const choiceBox1 = document.getElementById("choice1");
const choiceBox2 = document.getElementById("choice2");
const choiceBox3 = document.getElementById("choice3");
const count = document.getElementById("count-badge");
const apiKey = document.getElementById("apiKey");
const queryString = window.location.search;
const urlParams = new URLSearchParams(window.location.search);
const historyTable = document.getElementById("historyTable");
const history = document.getElementById("history");

btn.addEventListener("click", async function() {
  if(urlParams.get("pexels") !== null){
    apiKey.value=urlParams.get("pexels");
  }
  
  if(apiKey.value==""){
    apiKey.style.backgroundColor="pink";
    alert("Input Pexels API Key into highlighted text field");
    return;
  }

  apiKey.style.backgroundColor="";
  console.log("btn pressed");
  choiceBox1.innerHTML = "";
  choiceBox2.innerHTML = "";
  choiceBox3.innerHTML = "";

  let activity = random(activities);
  document.getElementById("activityLabel").innerText = activity;
  choiceBox1.appendChild(await fetchImg(activity));

  let place = random(cities);
  document.getElementById("cityLabel").innerText = place;
  choiceBox2.appendChild(await fetchImg(place));

  let food = random(foods);
  document.getElementById("foodLabel").innerText = food;
  choiceBox3.appendChild(await fetchImg(food));

  count.innerText++;
  let row = document.createElement("tr");
  let suggestionCount = document.createElement("td");
  suggestionCount.innerText=count.innerText;
  row.appendChild(suggestionCount);

  let foodHistory = document.createElement("td");
  foodHistory.innerText=food;
  row.appendChild(foodHistory);

  let placeHistory = document.createElement("td");
  placeHistory.innerText=place;
  row.appendChild(placeHistory);
  
  let activityHistory = document.createElement("td");
  activityHistory.innerText=activity;
  row.appendChild(activityHistory);

  history.appendChild(row);  
});

function random(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

async function fetchImg(randomChoice){
  return fetch("https://api.pexels.com/v1/search?query=" + randomChoice, {
  method: 'GET',
  headers: {
    'Authorization': apiKey.value,
  },
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  let div = document.createElement("div");
  let img = document.createElement("img");

  let moreInfoBtn = document.createElement("a");
  moreInfoBtn.innerText="More about " + randomChoice;
  moreInfoBtn.href="https://www.google.com/search?q=" + randomChoice;
  moreInfoBtn.className="more-btn mt-3 btn btn-sm btn-block btn-outline-primary";
  moreInfoBtn.target="_blank";

  let index = Math.floor(Math.random() * data.photos.length);
  console.log(randomChoice + " " + index);
  img.src=data.photos[index].src.tiny;
  img.alt=randomChoice;
  img.className="img-fluid";

  div.appendChild(img);
  div.appendChild(moreInfoBtn);

  return div;
})
.catch((error) => {
  console.error('Error:', error);
});
}

btn.click();
