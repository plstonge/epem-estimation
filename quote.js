const model_debug_level = 0

/**
 * @class EpemService
 *
 * Information about one service
 */
class EpemService {
  constructor(unique_id, type_id=0) {
    this.id = unique_id     // Object ID
    this.type_id = type_id  // Service ID

    // By default, in 48 hours from now, round to next 15 minutes
    this.start_dt = new Date()
    this.start_dt.setSeconds(0)
    this.start_dt.setMinutes(Math.ceil(this.start_dt.getMinutes() / 15) * 15)
    this.start_dt.setDate(this.start_dt.getDate() + 2)

    // By default, 30 minutes later
    this.until_dt = new Date(this.start_dt)
    this.until_dt.setMinutes(this.until_dt.getMinutes() + 30)
  }
}


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

    this.services = []
    this.staff = []
    this.detailedQuote = new DetailedQuote()

    // Usually a first visit and a pet sitting
    this.addService()
    this.addService()
  }

  _callBack(callback, ...args) {
    if (callback && (typeof callback === "function")) {
      callback(...args)
    }
  }

  _debug_log(debug_level, message) {
    if (model_debug_level >= debug_level) console.log(message)
  }

  addService() {
    let unique_id = 0
    let type_id = 0  // Default to Initial visit

    // Compute new unique ID
    if (this.services.length > 0) {
      unique_id = this.services[this.services.length - 1].id + 1
    }

    // Default to Pet sitting if there is already another service
    if (this.services.length > 0) type_id = 1

    // Add new service
    const new_service = new EpemService(unique_id, type_id)
    this.services.push(new_service)

    // Loggin information
    this._debug_log(1, 'Added service #' + new_service.unique_id)
    this._debug_log(2, new_service)
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
