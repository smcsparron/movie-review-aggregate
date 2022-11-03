import { Controller } from "@hotwired/stimulus"

const myApiKey = "d512529b"

export default class extends Controller {
  static targets = [ "text", "submit", "movieSearchCards", "movieSearchCards", "movieDetailsCard" ]

  connect() {
    console.log(`Hello from the movie search controller`)
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  displayMovies(data) {
    console.log(data.Search[0]);
    this.movieSearchCardsTarget.innerHTML = "";
    data.Search.forEach(movie => {
      this.movieSearchCardsTarget.insertAdjacentHTML("beforeend", `
      <div class="card mb-3" data-movie-search-target="movieSearchCard">
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

  selectMovie(event) {

  }

  displayMovieDetailsPage(movieData) {
    console.log(movieData);
  }

  fetchMovies(query) {
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${myApiKey}`;
    fetch(url)
      .then(response => response.json())
      .then(data => this.displayMovies(data));
  }

  search(event) {
    event.preventDefault();
    this.fetchMovies(this.textTarget.value);
  }
}
