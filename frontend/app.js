fetch('http://localhost:3000/animals')
    .then(response => response.json())
    .then(animalData => createAnimals(animalData))

const createAnimals = (animalData) => {
    animalData.forEach(addEachAnimal)
}

const addEachAnimal = (animal) => {
    const $ul = document.querySelector('ul')
    const $li = document.createElement('li')
    const picture = document.createElement('img')
    const likes = document.createElement('p')
    const likesButton = document.createElement('button')
    const deleteButton = document.createElement('button')


    deleteButton.className = "delete_button"

    picture.src = animal.image_url
    
    likes.textContent = animal.likes

    likesButton.innerText = 'Add Like'

    deleteButton.innerText = 'Delete'

    $li.append(picture, likes, likesButton, deleteButton)

    $ul.append($li)

    likesButton.addEventListener('click', event => addClick(event, animal, animal.id))

    deleteButton.addEventListener('click', event => {
        event.target.parentNode.remove()
        //.target where the event is being targeted
        fetch(`http://localhost:3000/animals/${animal.id}`, {
            method: 'DELETE'
        })

    })


}


//optimisitc render 

const addClick = (event, animal, id) => {
    const target = event.target.parentNode.firstChild.nextSibling 
    const animalLikes = parseInt(target.innerText)
    const newLikes = animalLikes + 1
    // setting newlikes to a const helps it persist
    target.innerText = newLikes

    fetch(`http://localhost:3000/animals/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            
            likes: newLikes
        })
        
        
    
    })

   
}


const animalForm = document.querySelector('#animal_form')
animalForm.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(animal_form)

    const animal = {
        image_url: formData.get("image_url"),
        likes: 0
    }

    fetch(`http://localhost:3000/animals`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ animal })
    }).then(response => response.json())
    .then( res => addEachAnimal(res))
    //this is pestimestic

})



//POST - pessimistic rendering

//PATCH likes - optimistic rendering

//DELETE animal
