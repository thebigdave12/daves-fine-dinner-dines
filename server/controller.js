let restaurants = require('./db.json')

let globalReccomendationID = 1

let userRecommendation = [
    {
        // recommendationId: 0,
        // recommendedRestaurantName: "Aubergine",
        // restaurantLocation: "Utah County"
    }
]



module.exports = {
    
    getRestuarants: (req, res) => {
        res.status(200).send(restaurants)
    },

    getRandomRestuarant: (req, res) => {
        let randomIndex = Math.floor(Math.random() * restaurants.length);
        
        res.status(200).send(restaurants[randomIndex])
    },

    getRestuarantRecommendation: (req, res) => {
        let recommendationArr = []

        const {foodType, priceRange, locationCounty} = req.body

        // console.log(req.body)

        // console.log(foodType)
        // console.log(priceRange)
        // console.log(locationCounty)

        for (let i = 0; i < restaurants.length; i++){
            let type = restaurants[i].foodType
            let price = restaurants[i].priceRange
            let location = restaurants[i].locationCounty

            if (foodType === "All Food Types" && priceRange === "All Price Ranges" && locationCounty === "All Locations"){
                 return res.status(200).send(restaurants)
            } else if (foodType === "All Food Types" && priceRange === "All Price Ranges" && locationCounty === location) {
                recommendationArr.push(restaurants[i])
            } else if (foodType === "All Food Types" && priceRange === price && locationCounty === "All Locations") {
                recommendationArr.push(restaurants[i])
            } else if (foodType === type && priceRange === "All Price Ranges" && locationCounty === "All Locations") {
                recommendationArr.push(restaurants[i])
            } else if (foodType === "All Food Types" && priceRange === price && locationCounty === location) {
                recommendationArr.push(restaurants[i])
            } else if (foodType === type && priceRange === "All Price Ranges" && locationCounty === location) {
                recommendationArr.push(restaurants[i])
            } else if (foodType === type && priceRange === price && locationCounty === "All Locations") {
                recommendationArr.push(restaurants[i])
            } else if (foodType === type && priceRange === price && locationCounty === location){
                recommendationArr.push(restaurants[i])
            }
        }
        res.status(200).send(recommendationArr)
    },

    addNote: (req, res) => {

        const {id} = req.params 
        const {note} = req.body
        // console.log(req.params)
        // console.log(note)

        const index = restaurants.findIndex((restaurants) => restaurants.restaurantID === +id)

        restaurants[index].userNote = note

        // console.log(restaurants[index])

        

        res.status(200).send(restaurants)
    },

    deleteNote: (req, res) => {

        const {id} = req.params 

        const index = restaurants.findIndex((restaurants) => restaurants.restaurantID === +id)

        restaurants[index].userNote = ""

        res.status(200).send(restaurants)
    },

    addUserRecommendation: (req, res) => {

        const {name, location} = req.body

        console.log(name)
        console.log(location)

        let newRecommendation = {
            recommendationId: globalReccomendationID,
            recommendedRestaurantName: name,
            restaurantLocation: location
        }

        userRecommendation.push(newRecommendation)

        globalReccomendationID++

        console.log(userRecommendation)

        res.status(200).send(newRecommendation)

    },

    getUserRecommendations: (req, res) => {
        res.status(200).send(userRecommendation)
        
    },


}