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
    //     newRestaurantRecommendationCard.innerHTML = `
    //     <div class="slide-container swiper">
    //     <div class="slide-content">
    //         <div class="card-wrapper swiper-wrapper">
    //             <div class="card swiper-slide">
    //                 <div class="image-content">
    //                     <span class="overlay"></span>

    //                     <div class="card-image">
    //                         <img src="./images/OteoFoodPic1 copy.jpeg" alt="oteo food" class="card-img">
    //                     </div>
    //                 </div>

    //                     <div class="card-content">
    //                         <h2 class='restaurantName'>Oteo's Bistro</h2>
    //                         <br>
    //                         <h3 class="foodType">Food Type  ->  Mexican</h3>
    //                         <h3 class="priceRange">Price Range  ->  $$</h3>
    //                         <h3 class="location">Location  ->  Utah County</h3>
    //                         <br>
    //                         <h3 class="davesReviewTitle"> Dave's Review:</h3>
    //                             <p class="davesReviewContent">5 out of 5 stars. Oteo is some of the Best Mexican food I’ve ever had in Utah. The menu is locally sourced and extremely fresh. With such a small menu, you really can’t go wrong.</p>
    //                         <br>    
    //                         <h3 class='recommendationUserNoteTitle'>User Note: </h3> 
    //                             <textarea rows="3" cols="46" id="newNote-${restaurant.restaurantID}" placeholder="Type Note Here..."></textarea>
    //                             <br></br>
    //                             <div class="noteBtn">
    //                             <button id="userNoteCreate" class="userNoteBtns">Post Your Note</button>
    //                             </div>
    //                     </div>
                    
    //             </div>
                
                    
    //             </div>
    //         </div>
    //     </div>

    //     <div class="swiper-button-next"></div>
    //     <div class="swiper-button-prev"></div>
    //     <div class="swiper-pagination"></div>
    // </div>


    //     `


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
                                    <button class="new-random-restaurant-button" id='random-display-new-random-restaurant-${restaurant.restaurantID}'>Let's Try Something Else...</button>
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