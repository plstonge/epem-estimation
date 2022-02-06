function model_log(debug_level, message) {
  const tmp_debug_level = 0

  if (tmp_debug_level >= debug_level) console.log(message)
}


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

  setTypeID(type_id) {
    this.type_id = type_id

    // Log information to console
    model_log(1, 'Service[' + this.id + '].type_id == ' + this.type_id)
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
    this.detailedQuote = new DetailedQuote()
  }

  _callBack(callback, ...args) {
    if (callback && (typeof callback === "function")) {
      callback(...args)
    }
  }

  bindServiceAdded(callback) {
    this.onServiceAdded = callback
  }

  serviceAdd() {
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
    this._callBack(this.onServiceAdded, new_service)
    this.modified = true

    // Log information to console
    model_log(1, 'Added service #' + new_service.id)
    model_log(2, new_service)
  }

  serviceSetTypeID(service_id, type_id) {
    for (const service of this.services) {
      if (service.id == service_id) {
        service.setTypeID(type_id)
        this.modified = true
        break
      }
    }
  }

  startNew() {
    this.services = []
    this.staff = []

    // Usually a first visit and a pet sitting
    this.serviceAdd()
    this.serviceAdd()

    // A new quote is considered non-modified
    this.modified = false
  }
}
