console.log('JS connected successfully!')

const baseURL = 'http://localhost:2323/restaurants'

//Step 1: 
const recommendationDisplay = document.querySelector("#restuarantRecommendationDisplay")
const randomRestuarantBtn = document.querySelector("#randomRecommendation")
const formGetRecommendations = document.querySelector("#recommendationForm")

//Step 2: 

createDisplayRecommendationCard = (restaurant) => {
    const newRestaurantRecommendationCard = document.createElement('section')

    console.log(restaurant.restaurantName)

    if (restaurant.userNote === "") {
        newRestaurantRecommendationCard.innerHTML = `
            <div>
                <h3 class='restaurantName'>${restaurant.restaurantName}</h3>
            </div>
            <div>
                <img src=${restaurant.foodPictureURL} alt='Picture of food item at ${restaurant.restaurantName}' class='foodPic'/>
            </div>
            <div>
                <h5 class='recommendationFoodType'>Food Type -> ${restaurant.foodType}</h5>
            </div>
            <div>
                <h5 class='recommendationPriceRange'>Price Range -> ${restaurant.priceRange}</h5>
            </div>
            <div>
                <h5 class='recommendationLocation'>Location -> ${restaurant.locationCounty}</h5>
            </div>
            <div>
                <h5 class='recommendationMenuLink'>Menu Link: </h5> <a href="${restaurant.menuLink}" class="menuLink">${restaurant.restaurantName} Menu</a>
            </div>
            <div class='reccomendationReview'>
                <h5 class='recommendationReviewTitle'>Dave's Review: </h5>
                <p class='recommendationReviewText'>${restaurant.davesReview}</p>
            </div>
            <div>
                <h5 class='recommendationUserNoteTitle'>User Note: </h5> 
                <p class='recommendationUserNoteText'>${restaurant.userNote}</p>
                <textarea rows="3" cols="55" id="newNote-${restaurant.restaurantID}" placeholder="Type Note Here..."></textarea>
                <br></br>
                <button id="userNoteCreate-${restaurant.restaurantID}" class="userNoteBtns">Post Your Note</button>
            </div>
        `
    } else {
        newRestaurantRecommendationCard.innerHTML = `
            <div>
                <h3 class='restaurantName'>${restaurant.restaurantName}</h3>
            </div>
            <div>
                <img src=${restaurant.foodPictureURL} alt='Picture of food item at ${restaurant.restaurantName}' class='foodPic'/>
            </div>
            <div>
                <h5 class='recommendationFoodType'>Food Type -> ${restaurant.foodType}</h5>
            </div>
            <div>
                <h5 class='recommendationPriceRange'>Price Range -> ${restaurant.priceRange}</h5>
            </div>
            <div>
                <h5 class='recommendationLocation'>Location -> ${restaurant.locationCounty}</h5>
            </div>
            <div>
                <h5 class='recommendationMenuLink'>Menu Link: </h5> <a href="${restaurant.menuLink}" class="menuLink">${restaurant.restaurantName} Menu</a>
            </div>
            <div class='reccomendationReview'>
                <h5 class='recommendationReviewTitle'>Dave's Review: </h5>
                <p class='recommendationReviewText'>${restaurant.davesReview}</p>
            </div>
            <div>
                <h5 class='recommendationUserNoteTitle'>User Note: </h5>
                <p class='recommendationUserNoteText'>${restaurant.userNote}</p> 
            <div>
            <button id="userNoteDelete-${restaurant.restaurantID}" class="userNoteBtns" onclick='deleteNote(${restaurant.restaurantID})'>Delete Note</button>
            </div>
    `
    }
    

    recommendationDisplay.appendChild(newRestaurantRecommendationCard)

    if (restaurant.userNote === "") {
        document.querySelector(`#userNoteCreate-${restaurant.restaurantID}`).addEventListener('click', () => {
            addNote(restaurant.restaurantID, document.getElementById(`newNote-${restaurant.restaurantID}`).value)
        })
    }    
}


const displayRestaurantRecommendations = (arr) => {
    if (arr.length === 0){
        const noMatchWithThoseParameters = document.createElement('section')
        noMatchWithThoseParameters.innerHTML = `
        <h3 class="warningMessage">Sorry I have no recommendations that matches the parameters above... Please try for a new recommendation!</h3>
        `

        recommendationDisplay.appendChild(noMatchWithThoseParameters)
    }

    for(let i = 0; i < arr.length; i++){
        createDisplayRecommendationCard(arr[i])
    }
}


const getRestaurantRecommendations = (e) => {
    e.preventDefault()
    recommendationDisplay.innerHTML = ''

    let foodType = document.querySelector('#foodTypeInput')
    let priceRange = document.querySelector('#priceRangeInput')
    let locationCounty = document.querySelector('#locationCountyInput')

    let bodyObj = {
        foodType: foodType.value,
        priceRange: priceRange.value,
        locationCounty: locationCounty.value
    }

    axios.post(`${baseURL}/recommendation`, bodyObj)
    .then((res) => {
        console.log(res.data)
        displayRestaurantRecommendations(res.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

displayRandomRestaurant = (e) => {
    e.preventDefault()
    recommendationDisplay.innerHTML = ''

    axios.get(`${baseURL}/random`)
    .then((res) => {
        restaurant = res.data
        const newRestaurantRecommendationCard = document.createElement('section')
        
        newRestaurantRecommendationCard.innerHTML = `
            <div>
                <h3 class='restaurantName'>${restaurant.restaurantName}</h3>
            </div>
            <div>
                <img src=${restaurant.foodPictureURL} alt='Picture of food item at ${restaurant.restaurantName}' class='foodPic'/>
            </div>
            <div>
                <h5 class='recommendationFoodType'>Food Type -> ${restaurant.foodType}</h5>
            </div>
            <div>
                <h5 class='recommendationPriceRange'>Price Range -> ${restaurant.priceRange}</h5>
            </div>
            <div>
                <h5 class='recommendationLocation'>Location -> ${restaurant.locationCounty}</h5>
            </div>
            <div>
                <h5 class='recommendationMenuLink'>Menu Link: </h5> <a href="${restaurant.menuLink}" class="menuLink">${restaurant.restaurantName} Menu</a>
            </div>
                <div class='reccomendationReview'>
            <h5 class='recommendationReviewTitle'>Dave's Review: </h5>
            <p class='recommendationReviewText'>${restaurant.davesReview}</p>
            </div>
            <button id='displayNewRandomRestaurant-${restaurant.restaurantID}'>Let's Try Something Else...</button>
        `
        recommendationDisplay.appendChild(newRestaurantRecommendationCard)
        document.querySelector(`#displayNewRandomRestaurant-${restaurant.restaurantID}`).addEventListener('click', displayRandomRestaurant)

    })
    .catch((err) => {
        console.log(err)
    })

}

addNote = (id, note) => {
    recommendationDisplay.innerHTML = ''

    console.log(note)

    let newNote = {
        note: note
    }

    axios.put(`${baseURL}/${id}`, newNote)
        .then((res) => {
            // displayRestaurantRecommendations(res.data)
            recommendationDisplay.innerHTML = ''

            let foodType = document.querySelector('#foodTypeInput')
            let priceRange = document.querySelector('#priceRangeInput')
            let locationCounty = document.querySelector('#locationCountyInput')

            let bodyObj = {
                foodType: foodType.value,
                priceRange: priceRange.value,
                locationCounty: locationCounty.value
            }

            axios.post(`${baseURL}/recommendation`, bodyObj)
                .then((res) => {
                console.log(res.data)
                displayRestaurantRecommendations(res.data)
                })
                .catch((err) => {
                console.log(err)
                })
        })
        .catch((err) => {
            console.log(err)
        })
}

const deleteNote = (id) => {
    
    axios.delete(`${baseURL}/${id}`)
    .then((res) => {
        recommendationDisplay.innerHTML = ''

            let foodType = document.querySelector('#foodTypeInput')
            let priceRange = document.querySelector('#priceRangeInput')
            let locationCounty = document.querySelector('#locationCountyInput')

            let bodyObj = {
                foodType: foodType.value,
                priceRange: priceRange.value,
                locationCounty: locationCounty.value
            }

            axios.post(`${baseURL}/recommendation`, bodyObj)
                .then((res) => {
                console.log(res.data)
                displayRestaurantRecommendations(res.data)
                })
                .catch((err) => {
                console.log(err)
                })
        })
        .catch((err) => {
        console.log(err)
        })

}

formGetRecommendations.addEventListener("submit", getRestaurantRecommendations);
randomRestuarantBtn.addEventListener("click", displayRandomRestaurant);