import { Controller } from "@hotwired/stimulus"

const myApiKey = "d512529b"

export default class extends Controller {
  static targets = [ "text", "submit", "displayMovies" ]

  connect() {
    console.log(`Hello from the movie search controller`)
  }

  displayMovies(data) {
    console.log(data);
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




// <div class="card mb-3">
// <div class="row g-0">
//   <!-- Movie Poster -->
//   <div class="col-6 movie-poster">
//     <img src="https://picsum.photos/150/222" class="img-fluid rounded-1 py-3" alt="...">
//   </div>
//   <div class="col-6 movie-details">
//     <ul>
//       <li>Title:</li>
//       <li>Year:</li>
//       <li>Type:</li>
//     </ul>
//   </div>
// </div>
// </div>
