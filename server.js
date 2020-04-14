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


// GET /api/owners - Works!
app.get("/api/owners", function (req, res, next) {
    res.send(owners);
})
// GET /api/owners/:id - Works!
app.get("/api/owners/:id", function (req, res, next) {
    let id = parseInt(req.params.id);
    let foundId = owners.find (function (owner) {
        return owner.id === id;
    })
    res.send(foundId);
})
// POST /api/owners - Works!
app.post("/api/owners", function (req, res, next) {
    let nextID = owners.reduce((acc,curr) => {
        if(curr.id > acc){
            return curr.id
        }
        return acc++
    }, 0) + 1;
    let newOwner = {
        id: nextID,
        name: req.body.name,
        pets: req.body.pets
    }
    owners.push(newOwner);

    res.send(newOwner)
})
// PUT /api/owners/:id - Works!
app.put("/api/owners/:id", function (req, res, next) {
    let id = parseInt(req.params.id);
    let foundID = owners.find (function (owner) {
        return owner.id === id;
    });
    foundID.name = req.body.name;

    res.send(foundID)
})
// DELETE /api/owners/:id - Works!
app.delete("/api/owners/:id", function (req, res, next) {
    let id = parseInt(req.params.id);
    let removedOwner;
    let foundID = owners.find (function (owner) {
        return owner.id === id;
    });
    for (let i = 0; i <owners.length; i++) {
        if (owners[i] === foundID) {
            removedOwner = owners.splice(i, 1);
        }
    }
    res.send(removedOwner);
})
// GET /api/owners/:id/pets - Works!
app.get("/api/owners/:id/pets", function (req, res, next) {
    let id = parseInt(req.params.id);
    let foundId = owners.find (function (owner) {
        return owner.id === id;
    })
    res.send(foundId.pets);
})
// GET /api/owners/:id/pets/:petId - Works!
app.get("/api/owners/:id/pets/:petId", function (req, res, next) {
    let id = parseInt(req.params.id);
    let foundId = owners.find (function (owner) {
        return owner.id === id;
    })
    let petId = parseInt(req.params.petId)
    let foundPet = foundId.pets.find(function (petID) {
        return petID.id === petId;
    })
    res.send(foundPet);
})
// POST /api/owners/:id/pets - Works!
app.post("/api/owners/:id/pets", function (req, res, next) {
    let id = parseInt(req.params.id);
    let foundId = owners.find (function (owner) {
        return owner.id === id;
    })
    let nextPetID = foundId.pets.reduce((acc,curr) => {
        if(curr.id > acc){
            return curr.id
        }
        return acc++
    }, 0) + 1;
    let newPet = {
        id: nextPetID,
        name: req.body.name,
        type: req.body.type
    }
    console.log(req.body.name);
    console.log(req.body.type);
    foundId.pets.push(newPet);

    res.send(foundId.pets)
})
// PUT /api/owners/:id/pets/:petId

// DELETE /api/owners/:id/pets/:petId


app.listen(3000, function(){
    console.log('Pets API is now listening on port 3000...');
})