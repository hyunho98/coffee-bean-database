//list based on location in the db.json
document.addEventListener("DOMContentLoaded", (e) => {
    coffeeForm = document.querySelector('.add-coffee-form')
    inputs = coffeeForm.querySelectorAll('.input-text')

    coffeeForm.addEventListener('submit', (e) => {})

    onsubmit = (e) => {
        e.preventDefault()

        fetch('http://localhost:3000/coffee_beans', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify({
                'location': `${inputs[0].value}`,
                'name': `${inputs[1].value}`,
                'taste': `${inputs[2].value}`,
                'rating': 0
            })
        })
        .then((response) => response.json())
        .then((data) => {
        })
    }
})