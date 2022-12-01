const express = require('express')
const bodyParser =  require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

  
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


let PORT = (process.env.PORT || 3000);

const mongoUrl = 'mongodb+srv://pevans:08050469567@cluster0.qurzf2k.mongodb.net/?retryWrites=true&w=majority'
MongoClient.connect(mongoUrl)
  .then(client => console.log('connected to mongobd'))
  .catch(err => console.error(err))



// PUT ZIP codes in each of these customers details
let phones = []

//ID generator
let newId = () => (phones.length > 0) ? phones.map(p => p.id).reduce((a, b) => Math.max(a, b), -Infinity): 0;

// Handle form in html file 
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

// Implement a Node application that returns a hardcoded list of phonebook 
// entries from the address http://localhost:3001/api/persons.
app.get(`/api/persons`, (req, res) => {
  res.json(phones)
})

// Implement a page at the address http://localhost:3001/info that looks roughly like this
// "Phonebook has info for 2 people
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
    name: customer.name, 
    number: customer.number,
    date: new Date()
  }

  let existingName = phones.map(p => p.name).find(n => customer.name === n)
  console.log(req.body)
  if (customer.name === null || customer.number === null ||  existingName ) {
    console.log(phones)
    return res.status(305).json({error: "name must be unique"})
  }else {
    let totalCustomers = phones.push(customer)
    console.log(totalCustomers)
    console.log(totalCustomers)
    return res.json(phones)
  }
})


app.listen(PORT)