/**
 * @class DetailedQuote
 *
 * Computed detailed quote - per day services and cost
 */
class DetailedQuote {
  constructor() {
    this.distance = 0.0
  }

  updateAll(distance, services) {
    this.distance = distance
  }
}


/**
 * @class Quote
 *
 * Main quote class - managing service queries
 */
class Quote {
  constructor() {
    this.modified = false

    this.last_id = 0
    this.services = []

    this.detailedQuote = new DetailedQuote()
  }

  _callBack(callback, ...args) {
    if (callback && (typeof callback === "function")) {
      callback(...args)
    }
  }

  bindAllChanged(callback) {
    this.onAllChanged = callback
  }

  setDistance(distance) {
    if (isNaN(distance) || distance < 0) { return }

    this.modified = true
    this.detailedQuote.updateAll(distance, this.services)

    this._callBack(this.onAllChanged, this.detailedQuote)
  }
}
