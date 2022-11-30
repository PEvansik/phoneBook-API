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



// Implement a Node application that returns a hardcoded list of phonebook 
// entries from the address http://localhost:3001/api/persons.

app.get(`/api/persons`, (req, res) => {
  res.json(phones)
})


// Implement a page at the address http://localhost:3001/info that looks roughly like this
// "Phonebook has info for 2 people
//
//${todat's date and time zone}"
app.get(`/info/`, (req, res) => {
  res.send(`<p>Phone book has entry for ${phones.length} people</p>`)
})


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


// Implement functionality that makes it possible to delete a single phonebook entry by making 
// an HTTP DELETE request to the unique URL of that phonebook entry.
app.delete(`/api/persons/:id`, (req, res) => {
  const {id} = req.params;
  let remainingPersons = phones.filter(p => p.id !== +id)
  console.log(remainingPersons)
  res.status(204).end()
})



// Expand the backend so that new phonebook entries can be added by making 
//HTTP POST requests to the address http://localhost:3001/api/persons.
// AND
// 3.6: Phonebook backend step6
// Implement error handling for creating new entries. The request is not allowed to succeed, if:
// a. The name or number is missing
// b. The name already exists in the phonebook
// Respond to requests like these with the appropriate status code, and also send back 
// information that explains the reason for the error, :

app.post(`/api/persons`, (req, res) => {
  res.setHeader("Content-Type", "application/json")
  let customer = req.body

  customer = {
    id: (newId() + 1),
    name: "Jemall", 
    number: "040-123e46"
  }

  let existingName = phones.map(p => p.name).find(n => customer.name === n)

  if (customer.name === null || customer.number === null ||  existingName ) {
    console.log(phones)
    return res.status(305).send({error: "name must be unique"})
  }else {
    let totalCustomers = phones.push(customer)
    console.log(totalCustomers)
    return res.json(phones)
  }
})


app.listen(PORT)