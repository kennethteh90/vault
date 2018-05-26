import express from 'express'
import router from './Routes/routes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const db = mongoose.connect('mongodb://vault:dragon@ds235850.mlab.com:35850/vault-dragon')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/object', router)

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
})
