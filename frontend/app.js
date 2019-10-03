fetch('http://localhost:3000/images')
    .then(response => response.json())
    .then(imageData => createImages(imageData))

const createImages = (imageData) => {
    imageData.forEach(addEachImage)

}

const addEachImage = image => {
    const $ul = document.querySelector('ul')
    const $li = document.createElement('li')

    const picture = document.createElement('img')
    picture.src = image.url

    const likes = document.createElement('p')
    likes.innerText = `Likes: ${image.likes}`

    const likesButton = document.createElement('button')
    likesButton.innerText = 'Add Like'
    likesButton.addEventListener('click', (event) => addClick(event, image, image.id))

    const removeAnimal = document.createElement('button')
    removeAnimal.innerText = 'Delete'
    removeAnimal.addEventListener('click', () => remove(event, image.id))

    $li.append(picture, likes, likesButton, removeAnimal)
    $ul.appendChild($li)
}

const imageForm = document.querySelector('#image_form')
imageForm.addEventListener("submit", event => {
    event.preventDefault()

    const formData = new FormData(image_form)

    let animal = {
        url: formData.get("url"),
        likes: 0
    }

    postAnimal(animal)
    event.target.reset()
})

//POST - pessimistic rendering
const postAnimal = (animal) => {
    console.log("animal in post", animal)
    fetch("http://localhost:3000/images", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            url: animal.url,
            likes: animal.likes
        })

    }).then(response => response.json())
        .then(res => addEachImage(res))
}

//PATCH - optimistic rendering
const addClick = (event, image, id) => {
    const target = event.target.parentNode.firstChild.nextSibling
    const likes = image.likes++
    target.innerText = `Likes: ${likes + 1}`



    fetch(`http://localhost:3000/images/${id}`, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PATCH',
        body: JSON.stringify({
            url: image.url,
            likes: likes,
        })
    })
}

//POST - pessimistic rendering
// var formData = new FormData(document.getElementById('test-form'));


//delete
const remove = (event, id) => {
    event.target.parentNode.remove()
    fetch(`http://localhost:3000/images/${id}`, {
        headers: { "Content-Type": "application/json" },
        method: 'DELETE',
        body: JSON.stringify({ id })
    })

}