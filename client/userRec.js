const formUserRecommendation = document.getElementById("userRecommendationForm")
const seeAllRecommendations = document.getElementById("seeAllRecommendations")


const createUserRestaurantRecommendationCard = (userRecommendation, restaurantNum) => {
    const userRecommendationCard = document.createElement('section')

    userRecommendationCard.innerHTML = `
        <div>
            <h3 class='restaurantRecommendationDisplay'>${restaurantNum}. ${userRecommendation.recommendedRestaurantName} in ${userRecommendation.restaurantLocation}</h3>
        </div>
    `
    restuarantUserRecommendationDisplay.appendChild(userRecommendationCard)
}

const displayUserRestaurantRecommendations = (arr) => {
        if (arr.length === 1){
            restuarantUserRecommendationDisplay.innerHTML = ''
            const noAddedUserRecommendations = document.createElement('section')
            noAddedUserRecommendations.innerHTML = `
            <h3 class="warningMessage">No recommendations have been added at this time... Please submit a recommendation above!</h3>
            `
            restuarantUserRecommendationDisplay.appendChild(noAddedUserRecommendations)
        } else {
            for(let i = 1; i < arr.length; i++){
                createUserRestaurantRecommendationCard(arr[i], i)
            }
        }

}

const getUserRestaurantRecommendations = (e) => {
    e.preventDefault()

    console.log("this worked")

    axios.get("http://localhost:2323/restaurants/user/reccomendation")
        .then((res) => {
            console.log(res.data)
            displayUserRestaurantRecommendations(res.data)

        }) 
        .catch((err) => {
            console.log(err)
        })
}

const addUserRecommendation = (e) => {
    e.preventDefault()
    restuarantUserRecommendationDisplay.innerHTML = ''

    let userRecommendationRestaurantName = document.querySelector('#userRecommendationName')
    let userRecommendationRestaurantLocation = document.querySelector('#userRecommendationLocation')

    let bodyObj = {
        name: userRecommendationRestaurantName.value,
        location: userRecommendationRestaurantLocation.value,
    }

    if (userRecommendationRestaurantLocation.value === '' || userRecommendationRestaurantName.value === '') {
        const needToFillSubmissionParameters = document.createElement('section')
            needToFillSubmissionParameters.innerHTML = `
            <h3 class="warningMessage">Looks like you forgot an item(s) in the form above. Please try again!</h3>
            `
            restuarantUserRecommendationDisplay.appendChild(needToFillSubmissionParameters)
    } else {
        axios.post("http://localhost:2323/restaurants/user/reccomendation", bodyObj)
            .then((res) => {
                userRecommendationRestaurantLocation.value = ''
                userRecommendationRestaurantName.value = ''
            })
            .catch((err) => {
                console.log(err)
            })

    }

}

formUserRecommendation.addEventListener("submit",addUserRecommendation);
seeAllRecommendations.addEventListener("click", getUserRestaurantRecommendations);