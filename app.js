var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: '192.168.99.100',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'express',
})
connection.connect(function (err) {
    if (err) throw err
    console.log('connected.')
})

var app = express()

app.use(cors())

app.use(bodyParser.json())
app.get('/', (request, response) => response.send('response'))

// localhost:3000/add
app.get(
    '/add',
    (req, res) => {
        const answer = parseFloat(req.query.add1) + parseFloat(req.query.add2)
        connection.query(`INSERT INTO addition (name, op1, op2, answer) VALUES("${req.query.name}",${req.query.add1},${req.query.add2},${answer})`)
        res.send( 
            {
                'result': answer
            }
        )
    }
)

app.post(
    '/add',
    (req, res) => {
        const name = req.body.addition_name
        connection.query("SELECT * FROM addition WHERE name = \"" + name + '\"',
            function (err, row) {
                res.send(row)
            }
        )
    }
)


// google.com -> ip address 
// localhost -> current machine
// localhost:3000
app.listen(3000, () => {
    console.log('server on localhost:3000')
})
