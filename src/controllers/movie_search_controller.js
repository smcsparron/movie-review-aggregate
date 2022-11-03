import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = [ "name" ]

  connect() {
    console.log(`Hello from the movie search controller`)
  }
}
