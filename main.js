const express = require('express')
const app = express()



let PORT = (process.env.PORT || 3000);
// PUT ZIP codes in each of these customers details
let phones = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

let phone;

let pickPhone = (req, items) => {
    const {id} = req.params
    return phone = items.filter(p => p.id === +id)
}


// 3.1:
// Implement a Node application that returns a hardcoded list of phonebook 
// entries from the address http://localhost:3001/api/persons.

app.get(`/api/persons`, (req, res) => {
    res.json(phones)
})

// 3.2:
// Implement a page at the address http://localhost:3001/info that looks roughly like this
// "Phonebook has info for 2 people
//
//${todat's date and time zone}"
app.get(`/info/`, (req, res) => {

    res.setHeader("Content-Type", "text/html")

    res.write(`<p>Phonebook has info for ${phones.length} people </p>`);
    res.write(`<p>${new Date()}<p>`);
    res.end()
})

// 3.3:
// Implement the functionality for displaying the information for a single phonebook entry. 
// The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5
// 
// If an entry for the given id is not found, the server has to respond with the appropriate status code.
app.get(`/api/persons/:id`, (req,res) => {

    pickPhone(req, phones, phone)
    if (phone) {
        console.log(phone)
        res.json(phone)
    }
    // res.statusMessage = "The phone id is not valid"
    res.status(404).end()
})

// 3.4:
// Implement functionality that makes it possible to delete a single phonebook entry by making 
// an HTTP DELETE request to the unique URL of that phonebook entry.
app. delete(`/api/persons/:id`, (req, res) => {
    pickPhone(req, phones, phone)
    console.log(`${phones.length} persons are left`)

    res.statusMessage = `phone ${phones.length} has been deleted`
    res.status(204).end()
    console.log(`${phones.length} has been deleted`)

})



app.listen(PORT)