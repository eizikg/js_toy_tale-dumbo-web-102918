//add toy button
const addBtn = document.querySelector('#new-toy-btn')
//new toy form
const toyform = document.querySelector('.container')
//toy collection
let addToy = false

const toyCollection = () => document.querySelector('#toy-collection')
// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', () => {

  let toyform = document.querySelector('.add-toy-form').addEventListener('submit', createToy)
  toyCollection().addEventListener('click', cardHandler)
  getAllToys(listToys)
})


//list all the items
function listToys(data){
  data.forEach((element) =>{
      name = element.name
      image = element.image
      id = element.id
      likes = element.likes
      li = createLi(id, name, image, likes)
      toyCollection().prepend(li)
    })
  }



addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyform.style.display = 'block'
    // submit listener here
  } else {
    toyform.style.display = 'none'
  }
})


function createToy(event){
  let name = toyform.querySelector('#name-input')
  let image = toyform.querySelector('#image-input')
  event.preventDefault()
  fetch(`http://localhost:3000/toys`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": name.value,
        "image": image.value,
        "likes": 0
      })
      })
    .then(res => res.json())
    .then(data => {
      let id = data.id
      toyCollection().prepend(createLi(id, name.value, image.value, 0))
      name.reset
      image.value

  })
}


function addLike(event){
  let id = event.target.parentElement.dataset.id
  let likes = parseInt(event.target.parentElement.querySelector('p').innerText) +1
  fetch(`http://localhost:3000/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({

        "likes": likes
      })
      })
      .then(res => res.json())
      .then(data => {

         event.target.parentElement.querySelector('p').innerText = likes
      })
}

function cardHandler(event){

  if (event.target.className === 'like-btn'){
    addLike(event)
  }
  if (event.target.className === 'delete-btn'){
    deleteToy(event)
  }
}

function deleteToy(event){
  event.preventDefault()
  fetch(`http://localhost:3000/toys/${event.target.parentElement.dataset.id}`, {
          method: "DELETE" })
          .then(event.target.parentElement.remove())
        }


//helper functions
 function getAllToys (callback){
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then((data) => callback(data))
}



function createLi(id, name, image, likes){
li = document.createElement ('div')
li.setAttribute('class', "card")
li.innerHTML += `<h2>${name}</h2>`
li.innerHTML += `<img src= ${image} class="toy-avatar">`
li.innerHTML += `<button class="like-btn">Like</button>`
li.innerHTML += `<button class="delete-btn">Delete</button>`
li.innerHTML += `<p>${likes}</p>`
li.dataset.id = id
return li
}
