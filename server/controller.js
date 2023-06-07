let restaurants = require('./db.json')

let globalReccomendationID = 2

let userRecommendation = [
    {
        recommendationId: 1,
        recommendedRestaurantName: "Aubergine",
        restaurantLocation: "Utah County"
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

        const index = restaurants.findIndex((restaurants) => restaurants.restaurantID === +id)

        restaurants[index].userNote = note

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

        let newRecommendation = {
            recommendationId: globalReccomendationID,
            recommendedRestaurantName: name,
            restaurantLocation: location
        }

        userRecommendation.push(newRecommendation)

        globalReccomendationID++

        res.status(200).send(newRecommendation)

    },

    getUserRecommendations: (req, res) => {
        res.status(200).send(userRecommendation)
        
    },


}