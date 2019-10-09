fetch('http://localhost:3000/animals')
    .then(response => response.json())
    .then(animalData => createAnimals(animalData))

const createAnimals = (animalData) => {
    animalData.forEach(addEachAnimal)
}

const addEachAnimal = animal => {
    
}

//POST - pessimistic rendering

//PATCH likes - optimistic rendering

//DELETE animal
