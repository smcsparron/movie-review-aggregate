import { Controller } from "@hotwired/stimulus"

const myApiKey = "d512529b"

export default class extends Controller {
  static targets = [ "text", "submit", "movieSearchCards", "movieCard", "movieDetailsCard" ]

  connect() {
    console.log(`Hello from the movie search controller`)
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  displayMoviesList(data) {``
    this.movieSearchCardsTarget.innerHTML = "";
    data.Search.forEach(movie => {
      this.movieSearchCardsTarget.insertAdjacentHTML("beforeend", `
      <div data-imdbid=${movie.imdbID} class="card mb-3" data-movie-search-target="movieCard" data-action="click->movie-search#selectMovie">
        <div class="row g-0">
          <!-- Movie Poster -->
          <div class="col-6 movie-poster">
            <img src="${movie.Poster}" class="img-fluid rounded-1 p-3" alt="${movie.Title} Poster">
          </div>
          <div class="col-6 movie-details">
            <ul>
              <li>${movie.Title}</li>
              <li>${movie.Year}</li>
              <li>${movie.Type[0].toUpperCase() + movie.Type.substring(1)}</li>
            </ul>
          </div>
        </div>
      </div>
      `);
    });
    this.movieSearchCardsTarget.hidden = false;
  }

  displaySelectedMovieDetailsPage(data) {
    // Below regex replace to remove all special characters and replace whitespace with underscore for rotten tomatoes movie link
    // console.log(data.Title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g,"_"))
    // Hiding search cards
    this.movieSearchCardsTarget.hidden = true;

    // Resetting movie details card
    this.movieDetailsCardTarget.innerHTML = "";

    // Inserting movie data
    this.movieDetailsCardTarget.insertAdjacentHTML("afterbegin", `
    <div class="row g-0">
    <!-- Movie Poster -->
    <div class="col-6 movie-poster">
      <img src="${data.Poster}" class="img-fluid rounded-1 pt-3" alt="${data.Title} Poster">
    </div>
    <div class="col-6 movie-details">
      <ul>
        <li><span style="font-weight:bold">Year:</span> ${data.Year}</li>
        <li><span style="font-weight:bold">Released:</span> ${data.Released}</li>
        <li><span style="font-weight:bold">Rated:</span> ${data.Rated}</li>
        <li><span style="font-weight:bold">Runtime:</span> ${data.Runtime}</li>
        <li><span style="font-weight:bold">Genre:</span> ${data.Genre}</li>
        <li><span style="font-weight:bold">Actors:</span> ${data.Actors}</li>
        <li><span style="font-weight:bold">Director:</span> ${data.Director}</li>
        <li><span style="font-weight:bold">Language:</span> ${data.Language}</li>
        <li><span style="font-weight:bold">Country:</span> ${data.Country}</li>
        <li><span style="font-weight:bold">Awards:</span> ${data.Awards}</li>
      </ul>
    </div>
    <!-- Movie description -->
    <div class="col-12 text-start">
      <div class="card-body">
        <h5 class="card-title">${data.Title}</h5>
        <p class="card-text">${data.Plot}</p>

        <div class="row">
          <!-- Rotten Tomatoes Rating -->
          <div class="col d-flex flex-column align-items-center rating-box">
            <a href="https://www.rottentomatoes.com/m/${data.Title.replace(/[^a-zA-Z0-9 ]/g, '').replace(/ /g,"_")}" target="_blank" class="d-flex flex-column align-items-center">
              <img src="./images/rottentomatoes_logo.png" class="img-review-thumbnail">
              <div class="d-flex justify-content-center">
                <div class="tomatometer d-flex align-items-center">
                  <img src="./images/fresh.png" class="tomato">
                  <span>${data.Ratings[1].Value ? data.Ratings[1].Value : "N/A" }</span>
                </div>
                <div class="tomatometer d-flex align-items-center">
                  <img src="./images/fresh_pop.png" class="tomato">
                  <span>TBA</span>
                </div>
              </div>
            </a>
          </div>

          <!-- IMDB rating -->
          <div class="col d-flex flex-column align-items-center rating-box">
            <a href="https://www.imdb.com/title/${data.imdbID}/" target="_blank" class="d-flex flex-column align-items-center">
              <img src="./images/IMDB_logo.png" class="img-review-thumbnail">
              <div class="d-flex justify-content-center">
                <div class="tomatometer d-flex align-items-center">
                  <img src="./images/star.png" class="tomato">
                  <span>${data.Ratings[0].Value}</span>
                </div>
              </div>
            </a>
          </div>

        </div>

        <div class="row">
          <!-- Metacritic rating -->
          <div class="col d-flex flex-column align-items-center rating-box">
            <img src="./images/metacritic_logo.png" class="img-review-thumbnail">
            <div class="d-flex justify-content-center">
              <div class="tomatometer d-flex align-items-center">
                <img src="./images/meta_positive.png" class="tomato">
                <span>${data.Ratings[2].Value}</span>
              </div>
            </div>
          </div>

          <!-- Average calculation -->
          <div class="col d-flex flex-column align-items-center rating-box">
            <img src="./images/average_text.png" class="img-review-thumbnail">
            <div class="d-flex justify-content-center">
              <div class="tomatometer d-flex align-items-center">
                <img src="./images/average.png" class="tomato">
                <span>TBA</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    `);

    // Un-hiding main movie details card
    this.movieDetailsCardTarget.hidden = false;
  }

  selectMovie(event) {
    this.fetchMovieDetails(event.currentTarget.dataset.imdbid)
  }

  fetchMoviesList(query) {
    // searching using the 's' tag which gives a list back
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${myApiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.displayMoviesList(data));
  }

  fetchMovieDetails(query) {
    // searching using the imdbID in the query i parameter
    const url = `https://www.omdbapi.com/?i=${query}&plot=full&apikey=${myApiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.displaySelectedMovieDetailsPage(data));
  }

  search(event) {
    event.preventDefault();
    this.fetchMoviesList(this.textTarget.value);
  }
}
