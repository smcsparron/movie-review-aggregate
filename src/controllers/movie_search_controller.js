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
    this.movieSearchCardsTarget.hidden = true;
    console.log(data);
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
    const url = `https://www.omdbapi.com/?i=${query}&apikey=${myApiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.displaySelectedMovieDetailsPage(data));
  }

  search(event) {
    event.preventDefault();
    this.fetchMoviesList(this.textTarget.value);
  }
}
