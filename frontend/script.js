// input the API
// doc: https://developer.themoviedb.org/docs/append-to-response
const APILINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=73ff2051c31533965635fd31718f422b&page=1"
const IMG_PATH = "https://image.tmdb.org/t/p/w1280"
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=73ff2051c31533965635fd31718f422b&query="

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK); // show all movies before searching
function returnMovies(url){
    fetch(url).then(res => res.json())
    .then(function(data){
        console.log(data.results);
        data.results.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');
            const div_row = document.createElement('div');
            div_row.setAttribute('class', 'row');
            const div_column = document.createElement('div');
            div_column.setAttribute('class', 'column');
            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');
            const title = document.createElement('h3');
            title.setAttribute('id', 'title');
            const center = document.createElement('center');

            title.innerHTML = `${element.title}<br><a href="movie.html?id=${element.id}&title=${element.title}">reviews<a>`;
            image.src = IMG_PATH + element.poster_path;

            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);
            main.appendChild(div_row);
        });
    });
}

// start new search after search move, remove the old movies
form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';  // remove the initial movies

    const searchItem = search.value;
    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        searchItem = "";
    }

});