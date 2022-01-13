class DetailedQuote {
  constructor() {
    this.distance = 0.0
  }
}


class Quote {
  constructor() {
    this.modified = false

    this.last_id = 0
    this.services = []

    this.detailedQuote = new DetailedQuote()
  }

  bindDistanceChanged(callback) {
    this.onDistanceChanged = callback
  }

  setDistance(distance) {
    if (isNaN(distance)) { return }
    this.modified = true
    this.detailedQuote.distance = distance

    if (this.onDistanceChanged &&
        (typeof this.onDistanceChanged === "function")) {
      this.onDistanceChanged(this.detailedQuote)
    }
  }
}
