fetch('http://localhost:3000/animals')
    .then(response => response.json())
    .then(animalData => createAnimals(animalData))

const createAnimals = (animalData) => {
    animalData.forEach(addEachAnimal)
}

const addEachAnimal = animal => {
    const $ul = document.querySelector('ul')
    const $li = document.createElement('li')

    const picture = document.createElement('img')
    console.log("animal image", animal.image_url)
    picture.src = animal.image_url

    const likes = document.createElement('p')
    likes.innerText = animal.likes

    const likesButton = document.createElement('button')
    likesButton.innerText = 'Add Like'
    likesButton.addEventListener('click', (event) => addClick(event, animal, animal.id))

    const removeAnimal = document.createElement('button')
    removeAnimal.innerText = 'Delete'
    removeAnimal.addEventListener('click', () => remove(event, animal.id))

    $li.append(picture, likes, likesButton, removeAnimal)
    $ul.appendChild($li)
}

const animalForm = document.querySelector('#animal_form')
animalForm.addEventListener("submit", event => {
    event.preventDefault()

    const formData = new FormData(animal_form)

    let animal = {
        image_url: formData.get("image_url"),
        likes: 0
    }

    postAnimal(animal)
    event.target.reset()
})

//POST - pessimistic rendering
const postAnimal = (animal) => {
    console.log("animal in post", animal)
    fetch("http://localhost:3000/animals", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            image_url: animal.image_url,
            likes: animal.likes
        })

    }).then(response => response.json())
        .then(res => addEachAnimal(res))
}

//PATCH - optimistic rendering
const addClick = (event, animal, id) => {
    const target = event.target.parentNode.firstChild.nextSibling
    const animalLikes = parseInt(target.innerText)
    const likes = animal.likes++
    target.innerText = animalLikes + 1

    fetch(`http://localhost:3000/animals/${id}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PATCH',
        body: JSON.stringify({
            image_url: animal.image_url,
            likes: likes,
        })
    })

}

//delete -- optimisitic
const remove = (event, id) => {
    event.target.parentNode.remove()
    fetch(`http://localhost:3000/animals/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: 'DELETE',
        body: JSON.stringify({ id })
    })

}