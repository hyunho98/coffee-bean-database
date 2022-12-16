fetch('http://localhost:3000/coffee_beans')
.then((response) => response.json())
.then((data) => {
    console.log(data)
})

//list based on location in the db.json