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


btn.addEventListener("click", async function() {
  if(urlParams.get("pexels") != ""){
    apiKey.value=urlParams.get("pexels");
  }
  if(apiKey.value==""){
    apiKey.style.backgroundColor="pink";
    apiKey.value="Paste Pexels API Key here";
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

  let city = random(cities);
  document.getElementById("cityLabel").innerText = city;
  choiceBox2.appendChild(await fetchImg(city));

  let food = random(foods);
  document.getElementById("foodLabel").innerText = food;
  choiceBox3.appendChild(await fetchImg(food));

  count.innerText++;
});

function random(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

async function fetchImg(choice){
  return fetch("https://api.pexels.com/v1/search?query=" + choice, {
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

  let btn = document.createElement("a");
  btn.innerText="More about " + choice;
  btn.href="https://www.google.com/search?q=" + choice;
  btn.className="more-btn mt-3 btn btn-sm btn-block btn-outline-primary";
  btn.target="_blank";

  let index = Math.floor(Math.random() * data.photos.length);
  console.log(choice + " " + index);
  img.src=data.photos[index].src.tiny;
  img.alt=choice;
  img.className="img-fluid";

  div.appendChild(img);
  div.appendChild(btn);

  return div;
})
.catch((error) => {
  console.error('Error:', error);
});
}

btn.click();
