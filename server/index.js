// Require Packages
const express = require('express')
const cors = require('cors')


//App Instance
const app = express()

//Middleware
app.use(express.json())
app.use(cors())

// Endpoints

const {getRestuarants, getRandomRestuarant, getRestuarantRecommendation, addNote, deleteNote, addUserRecommendation, getUserRecommendations} = require('./controller')

app.get('/restaurants', getRestuarants)
app.get('/restaurants/random', getRandomRestuarant)
app.get('/restaurants/recommendation', getRestuarantRecommendation)
app.put('/restaurants/:id', addNote)
app.delete('/restaurants/:id', deleteNote)
app.post('/restaurants/user/reccomendation', addUserRecommendation)
app.get('/restaurants/user/reccomendation', getUserRecommendations)

// Server Start

app.listen(2323, () => console.log("All burgers on 2323"))