const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
var app = express()



connectToMongo();


const port = 5000

 

app.use(express.json())
app.use(cors())
//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port ${port}`)
})
