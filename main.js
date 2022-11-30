const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))



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

let newId = () => phones.map(p => p.id).reduce((a, b) => Math.max(a, b), -Infinity);


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
  res.send(`<p>Phone book has entry for ${phones.length} people</p>`)
})

// 3.3:
// Implement the functionality for displaying the information for a single phonebook entry. 
// The url for getting the data for a person with the id 5 should be http://localhost:3001/api/persons/5
// 
// If an entry for the given id is not found, the server has to respond with the appropriate status code.
app.get(`/api/persons/:id`, (req,res) => {
  const {id} = req.params;
  let person = phones.find(p => p.id === +id)

  if (person) {
    return res.json(person)
  } else {
    return res.status(404).end()
  }
})

// 3.4:
// Implement functionality that makes it possible to delete a single phonebook entry by making 
// an HTTP DELETE request to the unique URL of that phonebook entry.
app.delete(`/api/persons/:id`, (req, res) => {
  const {id} = req.params;
  let remainingPersons = phones.filter(p => p.id !== +id)
  console.log(remainingPersons)
  res.status(204).end()
})


// 3.4:
// Expand the backend so that new phonebook entries can be added by making 
//HTTP POST requests to the address http://localhost:3001/api/persons.
app.post(`/api/persons`, (req, res) => {
  let customer = req.body

  customer = {
    id: (newId() + 1),
    name: "Arto Hellas", 
    number: "040-123456"
  }

  let totalCustomers = phones.push(customer)
  console.log(totalCustomers)

  res.json(phones)
})


app.listen(PORT)