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
        <div class="display-card-container">
            <div class="display-slide-content">
                <div class="display-card-wrapper">
                    <div class="display-card">
                        <div class="display-image-content">
                            <span class="display-overlay"></span>

                            <div class="display-card-image">
                                <img src="${restaurant.foodPictureURL}" alt="This is a beautiful picture of food" class="display-card-image-2">
                            </div>
                        </div>
                            <div class="display-card-content">   
                                <h2 class='display-restaurant-name'>${restaurant.restaurantName}</h2>
                                <br>
                                <h3 class="display-food-type">Food Type  ->  ${restaurant.foodType}</h3>
                                <h3 class="display-price-range">Price Range  ->  ${restaurant.priceRange}</h3>
                                <h3 class="display-location">Location  ->  ${restaurant.locationCounty}</h3>
                                <h3 class="display-menu-link">Menu  -> <a href="${restaurant.menuLink}" class="diplay-menu-Link">${restaurant.restaurantName} Menu</a> <h3/>
                                <br>
                                <h3 class="display-daves-review-title"> Dave's Review:</h3>
                                    <p class="display-daves-review-content">${restaurant.davesReview}</p>
                                <br> 
                                <h3 class='display-recommendation-user-note-title'>User Note: </h3> 
                                    <p class='display-recommendation-user-note-text'>${restaurant.userNote}</p>
                                <textarea rows="3" cols="46" id="new-note-${restaurant.restaurantID}" placeholder="Type Note Here..."></textarea>
                                <br></br>
                                <div class="note-btn">
                                    <button id="user-note-create-${restaurant.restaurantID}" class="user-note-create">Post Your Note</button>
                                </div>         
                            </div>
                    </div>
                </div>
            </div>

        </div>

        <br>
 
        `
    } else {
        newRestaurantRecommendationCard.innerHTML = `
        <div class="display-card-container>
        <div class="display-card-content">
            <div class="display-card-wrapper">
                <div class="display-card">
                    <div class="display-image-content">
                        <span class="display-overlay"></span>

                        <div class="display-card-image">
                            <img src="${restaurant.foodPictureURL}" alt="This is a beautiful picture of food" class="display-card-image-2">
                        </div>
                    </div>
                        <div class="display-card-content">   
                            <h2 class='display-restaurant-name'>${restaurant.restaurantName}</h2>
                            <br>
                            <h3 class="display-food-type">Food Type  ->  ${restaurant.foodType}</h3>
                            <h3 class="display-price-range">Price Range  ->  ${restaurant.priceRange}</h3>
                            <h3 class="display-location">Location  ->  ${restaurant.locationCounty}</h3>
                            <h3 class="display-menu-link">Menu  -> <a href="${restaurant.menuLink}" class="diplay-menu-Link">${restaurant.restaurantName} Menu</a> <h3/>
                            <br>
                            <h3 class="display-daves-review-title"> Dave's Review:</h3>
                                <p class="display-daves-review-content">${restaurant.davesReview}</p>
                            <br> 
                            <h3 class='display-recommendation-user-note-title'>User Note: </h3> 
                                <p class='display-recommendation-user-note-text'>${restaurant.userNote}</p>
                                <br></br>
                                <div class="note-btn">
                                <button id="userNoteDelete-${restaurant.restaurantID}" class="user-note-delete" onclick='deleteNote(${restaurant.restaurantID})'>Delete Note</button>
                                </div>         
                        </div>
                </div>
            </div>
        </div>
    </div>
    `
    }
    

    recommendationDisplay.appendChild(newRestaurantRecommendationCard)

    if (restaurant.userNote === "") {
        document.querySelector(`#user-note-create-${restaurant.restaurantID}`).addEventListener('click', () => {
            addNote(restaurant.restaurantID, document.getElementById(`new-note-${restaurant.restaurantID}`).value)
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
            <div class="random-card-container>
                <div class="random-card-content">
                    <div class="random-card-wrapper">
                        <div class="random-card">
                            <div class="random-image-content">
                                <span class="random-overlay"></span>

                                <div class="random-card-image">
                                    <img src="${restaurant.foodPictureURL}" alt="This is a beautiful picture of food" class="random-card-image-2">
                                </div>
                            </div>
                                <div class="random-card-content"> 
                                    <h2 class='random-restaurant-name'>${restaurant.restaurantName}</h2>
                                    <br>
                                    <h3 class="random-food-type">Food Type  ->  ${restaurant.foodType}</h3>
                                    <h3 class="random-price-range">Price Range  ->  ${restaurant.priceRange}</h3>
                                    <h3 class="random-location">Location  ->  ${restaurant.locationCounty}</h3>
                                    <h3 class="random-menu-link">Menu  -> <a href="${restaurant.menuLink}" class="menuLink">${restaurant.restaurantName} Menu</a> <h3/>
                                    <br>
                                    <h3 class="random-daves-review-title"> Dave's Review:</h3>
                                        <p class="random-daves-review-content">${restaurant.davesReview}</p>
                                    <br> 
                                    <div class="random-restaurant-button">
                                        <button class="new-random-restaurant-button" id='random-display-new-random-restaurant-${restaurant.restaurantID}'>Let's Try Something Else</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        recommendationDisplay.appendChild(newRestaurantRecommendationCard)
        document.getElementById(`random-display-new-random-restaurant-${restaurant.restaurantID}`).addEventListener('click', displayRandomRestaurant)

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