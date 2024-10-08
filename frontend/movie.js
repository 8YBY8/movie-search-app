const url = new URL(location.href); 
const movieId = url.searchParams.get("id")
const movieTitle = url.searchParams.get("title")

// input the API
// doc: https://developer.themoviedb.org/docs/append-to-response
// const APILINK = 'http://127.0.0.1:5500/backend/api/v1/reviews/';
// const APILINK = '../backend/api/v1/reviews/';
// const APILINK = 'https://movie-search-app-22pv.onrender.com/api/v1/reviews/';
const APILINK = 'https://3aa70ddf-379a-4101-a9c3-213ae8ff63e1-00-8akbmliqyvsb.picard.replit.dev/api/v1/reviews/';
// const APILINK = 'https://8yby8.github.io/movie-search-app-backend/api/v1/reviews/';


const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;

// create a review card that user can create new review
const div_new = document.createElement('div');
div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card">
          New Review
          <p><strong>Review: </strong>
            <input type="text" id="new_review" value="">
          </p>
          <p><strong>User: </strong>
            <input type="text" id="new_user" value="">
          </p>
          <p><a href="#" onclick="saveReview('new_review', 'new_user')">Save</a>
          </p>
      </div>
    </div>
  </div>
`
main.appendChild(div_new)

returnReviews(APILINK); // show all the reviews of this movie

function returnReviews(url){
    fetch(url + "movie/" + movieId).then(res => res.json())
    .then(function(data){
        console.log(data);
    (data).forEach(review => {
            const div_card = document.createElement('div');
            div_card.innerHTML = `
                <div class="row">
                    <div class="column">
                    <div class="card" id="${review._id}">
                        <p><strong>Review: </strong>${review.review}</p>
                        <p><strong>User: </strong>${review.user}</p>
                        <p><a href="#"onclick="editReview('${review._id}','${review.review}', '${review.user}')">Edit</a> <a href="#" onclick="deleteReview('${review._id}')">Delete</a></p>
                    </div>
                    </div>
                </div>
            `

    main.appendChild(div_card);
        });
    });
}

function editReview(id, review, user) {

    const element = document.getElementById(id); // get access the id
    const reviewInputId = "review" + id
    const userInputId = "user" + id
    
    element.innerHTML = `
        <p><strong>Review: </strong>
            <input type="text" id="${reviewInputId}" value="${review}">
        </p>
        <p><strong>User: </strong>
            <input type="text" id="${userInputId}" value="${user}">
        </p>
        <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}',)">Save</a>
        </p>
    
    `
}

function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;
    
    // if id exist
    if (id) {
      fetch(APILINK + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user": user, "review": review})
      }).then(res => res.json())
        .then(res => {
          console.log(res)
          location.reload();
        });
    // if no id, then it means we are creating new review        
    } else {
      fetch(APILINK + "new", {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
      }).then(res => res.json())
        .then(res => {
          console.log(res)
          location.reload();
        });
    }
}
  
function deleteReview(id) {
    fetch(APILINK + id, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
    });    
}
