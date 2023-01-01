//list based on location in the db.json
//star rating system
document.addEventListener("DOMContentLoaded", (e) => {
    const locations = new Set()
    const coffeeForm = document.querySelector('.add-coffee-form')
    const inputs = coffeeForm.querySelectorAll('.input-text')
    coffeeForm.addEventListener('submit', (e) => {}) //Creates a submit event listener for the create form

    onsubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:3000/coffee_beans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                'location': `${inputs[0].value.toUpperCase()}`,
                'name': `${inputs[1].value.toUpperCase()}`,
                'taste': `${inputs[2].value}`,
                'rating': 0
            })
        })
        .then((response) => response.json())
        .then((data) => {
            document.getElementById('tile-container').append(createTile(data))
        })
    }

    //Pulls elements from the db and populate the DOM
    fetch('http://localhost:3000/coffee_beans')
        .then((response) => response.json())
        .then((data) => {
            data.forEach((bean) => {
                document.getElementById('tile-container').append(createTile(bean))
                locations.add(bean.location)
            })
        })
})

function createTile(beanObj) {
    const tile = document.createElement('div')
    const locationh3 = document.createElement('h3')
    const nameh3 = document.createElement('h3')
    const p = document.createElement('p')
    const div = document.createElement('div')

    tile.className = 'tile'
    locationh3.innerText = beanObj.location
    locationh3.className = 'location'
    nameh3.innerText = beanObj.name
    nameh3.className = 'name'
    p.innerText = beanObj.taste
    div.className = `rating ${beanObj.rating}`

    createStars(div)
    tile.append(locationh3, nameh3, p, div)
    return tile;
}

function createStars(div) {
    let h4
    for(let i = 0; i < 5; i++) {
        h4 = document.createElement('h4')
        h4.innerText = '☆'
        h4.className = `${i + 1}`
        div.append(h4)
    }

    for(let i = 0; i < 5; i++) {
        div.children[i].addEventListener(('click'), (e) => {
            toggleStars(div, (i + 1))
        })
    }
}

function toggleStars(rDiv, rating) {
    for(let i = rating - 1; i >= 0; i--) {
        if (rDiv.children[i].innerHTML === '★') {
            rDiv.children[i].innerHTML = '☆'
        } else {
            rDiv.children[i].innerHTML = '★'
        }
    }
}
