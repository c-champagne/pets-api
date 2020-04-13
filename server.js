var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var owners = [
    {
        id: 1,
        name: "Adam",
        pets: [
            {
                id: 1,
                name: "Vera",
                type: "Dog"
            },
            {
                id: 2,
                name: "Felix",
                type: "Cat"
            }
        ]
    },
    {
        id: 2,
        name: "Kamilah",
        pets: [
            {
                id: 1,
                name: "Doug",
                type: "Dog"
            }
        ]
    }
];


// GET /api/owners
app.get("/api/owners", function (req, res, next) {
    res.send(owners);
})
// GET /api/owners/:id
app.get("/api/owners/:id", function (req, res, next) {
    let id = parseInt(req.params.id);
    let foundId = owners.find (function (owner) {
        return owner.id === id;
    })
    res.send(foundId);
})
// POST /api/owners
app.post("/api/owners", function (req, res, next) {
    let nextID = owners.reduce((acc,curr) => {
        if(curr.id > acc){
            return curr.id
        }
        return acc++
    }, 0) + 1;
    let newOwner = {
        id: nextID,
        name: req.body.owner,
        pets: req.body.pets
    }
    owners.push(newOwner);

    res.send(newOwner)
})
// PUT /api/owners/:id
app.put("/api/owners/:id", function (req, res, next) {
    let id = parseInt(req.params.id);
    let foundID = owners.find (function (owner) {
        return item.id === id;
    });
    foundID.name = req.body.name;
})
// DELETE /api/owners/:id
app.delete("/api/owners/:id", function (req, res, next) {
    let id = parseInt(req.params.id);
    let removedOwner;
    let foundID = owners.find (function (owner) {
        return owner.id === id;
    });
    for (let i = 0; i <owners.length; i++) {
        if (owners[i] === foundID) {
            removedOwner = todoList.splice(i, 1);
        }
    }
    res.send(removedOwner);
})
// GET /api/owners/:id/pets

// GET /api/owners/:id/pets/:petId

// POST /api/owners/:id/pets

// PUT /api/owners/:id/pets/:petId

// DELETE /api/owners/:id/pets/:petId


app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
})