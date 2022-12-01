const express = require('express')
const bodyParser =  require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.set('view engine', 'ejs')
  
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))



let PORT = (process.env.PORT || 3000);

const mongoUrl = 'mongodb+srv://pevans:08050469567@cluster0.qurzf2k.mongodb.net/?retryWrites=true&w=majority'

MongoClient.connect(mongoUrl)
  .then(client => {
    console.log('connected to mongobd')
    const db = client.db('phone-book');
    const customersDetails = db.collection('customersdetails')
    
    app.use(bodyParser.urlencoded({extended: true}))

    let phones = []


    let customerId = () => (phones.length > 0) ? phones.map(p => p.id).reduce((a, b) => Math.max(a, b), -Infinity): 0;

// *********************************************************
// **************   ****************************    *******
// ************************* VERBS ************************
// ********************************************************
// *********************************************************
    app.get('/', (req, res) => {
      let cursor = customersDetails.find().toArray()
        .then(cursor => console.log(cursor, cursor.length))

      res.sendFile(__dirname + '/index.html')
    })

    app.get(`/api/persons`, (req, res) => {
      res.json(phones)
    })


    app.get(`/info/`, (req, res) => {
      res.send(`<p>Phone book has entry for ${phones.length} people</p>`)
    })


    app.get(`/api/persons/:id`, (req,res) => {
      const {id} = req.params;
      let person = phones.find(p => p.id === +id)
    
      if (person) {
        return res.json(person)
      } else {
        return res.status(404).end()
      }
    })


    app.delete(`/api/persons/:id`, (req, res) => {
      const {id} = req.params;
      let remainingPersons = phones.filter(p => p.id !== +id)
      console.log(remainingPersons)
      res.status(204).end()
    })


    app.post(`/api/persons`, (req, res) => {
      res.setHeader("Content-Type", "application/json")
      let customer = req.body

      let existingName = phones.map(p => p.name).find(n => customer.name === n);
    
      customersDetails.insertOne(customer)
        .then(result => {

          customer = {
            id: (customerId() + 1),
            name: customer.name, 
            number: customer.number,
            date: new Date()
          }
          console.log(req.body)
          console.log(result)

          if (customer.name === null || customer.number === null ||  existingName ) {
            console.log(phones)
            // return res.status(305).json({error: "name must be unique"})
          }else {
            let totalCustomers = phones.push(customer)
            console.log(totalCustomers)
            console.log(`${db}`)
            res.redirect('/')
            // return res.json(phones)
          }



        })
        .catch(err => console.error(err))

    })
    app.listen(PORT)

  })
  .catch(err => console.error(err))






