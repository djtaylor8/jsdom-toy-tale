let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//get toys and create cards
const div = document.getElementById('toy-collection')
let obj;
fetch('http://localhost:3000/toys')
.then(resp => resp.json())
.then(data => obj = data)
.then(function(obj) {
  let objArr = [...obj]
  objArr.forEach(toy => {
  let card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-id', `${toy.id}`)

  let name = document.createElement('h2');
  name.innerText = toy.name;

  let img = document.createElement('img')
  img.className = 'toy-avatar'
  img.src = toy.image;

  let p = document.createElement('p');
  p.className = 'likes'
  p.innerHTML = toy.likes;

  let btn = document.createElement('button');
  btn.className = 'like-btn';
  btn.innerHTML = 'Like <3';

  card.appendChild(name);
  card.appendChild(img);
  card.appendChild(p);
  card.appendChild(btn);
  div.appendChild(card);
  });
});


//add new toy via post request
const createToy = document.querySelector('.submit')
createToy.addEventListener('click', () => {
  postFormData();
})

function postFormData() {
let formData = new FormData(document.querySelector('.add-toy-form'));
let toyName = formData.get('name');
let toyImage = formData.get('image');

let configObj = {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
  },
  body: JSON.stringify({
    "name": toyName,
    "image": toyImage,
    "likes": 0
  })
};

fetch('http://localhost:3000/toys', configObj)
.then(function(response) {
  return response.json();
})
.then(function(object) {
  console.log(object);
  let card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-id', `${object.id}`)


  let name = document.createElement('h2');
  name.innerText = object.name;

  let img = document.createElement('img')
  img.className = 'toy-avatar'
  img.src = object.image;

  let p = document.createElement('p');
  p.className = 'likes'
  p.innerHTML = object.likes;

  let btn = document.createElement('button');
  btn.className = 'like-btn';
  btn.innerHTML = 'Like <3';

  card.appendChild(name);
  card.appendChild(img);
  card.appendChild(p);
  card.appendChild(btn);
  div.appendChild(card);
  })
.catch(function(error) {
  error.message = 'Unauthorized Access'
  console.log(error.message)
  });
};


let toyUrl = 'http://localhost:3000/toys'
const toyCollection = document.getElementById('toy-collection');
toyCollection.addEventListener('click', function (event) {
  let likeButtonIsPressed = event.target.className === "like-btn"


  if (likeButtonIsPressed) {
    let id = event.target.parentElement.dataset.id
    let like = event.target.previousElementSibling
    let likeCount = parseInt(event.target.previousElementSibling.innerText)
    like.innerText = `${++likeCount}`

    fetch(toyUrl + '/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "likes": likeCount
      })

    })
      .then(response => response.json())
      .then(console.log)
  }
})