fetch('http://localhost:3000/animals')
    .then(response => response.json())
    .then(animalData => createAnimals(animalData))

//POST - pessimistic rendering

//PATCH likes - optimistic rendering

//DELETE animal
