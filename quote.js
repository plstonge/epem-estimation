/**
 * Logger for the model - increase debugLevel in code to get more debug info
 * @param {*} requiredLevel - required debug level defined by caller
 * @param {*} message - the message to print in console
 */
function modelLog(message, requiredLevel = 0) {
  const debugLevel = 0  // Edit me - 0 by default

  if(debugLevel >= requiredLevel) console.log(message)
}


/**
 * @class EpemService
 *
 * Information about one service
 */
class EpemService {
  constructor(uniqueID, typeID=0) {
    this.id = uniqueID    // Object ID
    this.typeID = typeID  // Service ID

    // By default, in 48 hours from now, round to next 15 minutes
    this.startDT = new Date()
    this.startDT.setSeconds(0)
    this.startDT.setMinutes(Math.ceil(this.startDT.getMinutes() / 15) * 15)
    if(this.startDT.getHours() < serviceHours.start) {
      this.startDT.setHours(serviceHours.start, 0)
    }
    if(this.startDT.getHours() >= serviceHours.end) {
      this.startDT.setHours(serviceHours.end - 1, 30)
    }
    this.startDT.setDate(this.startDT.getDate() + 2)

    // By default, 30 minutes later
    this.untilDT = new Date(this.startDT)
    this.untilDT.setMinutes(this.untilDT.getMinutes() + 30)
  }

  setTypeID(typeID) {
    this.typeID = typeID

    // Log information to console
    modelLog('Service[' + this.id + '].typeID === ' + this.typeID, 1)
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
    if(callback && (typeof callback === "function")) {
      callback(...args)
    }
  }

  bindServiceAdded(callback) {
    this.onServiceAdded = callback
  }

  serviceAdd() {
    let uniqueID = 0
    let typeID = 0  // Default to Initial visit

    // Compute new unique ID
    if(this.services.length > 0) {
      uniqueID = this.services[this.services.length - 1].id + 1
    }

    // Default to Pet sitting if there is already another service
    if(this.services.length > 0) {
      typeID = 1
    }

    // Add new service
    const newService = new EpemService(uniqueID, typeID)
    this.services.push(newService)
    this._callBack(this.onServiceAdded, newService)
    this.modified = true

    // Log information to console
    modelLog('Added service #' + newService.id, 1)
    modelLog(newService, 2)
  }

  serviceSetTypeID(serviceID, typeID) {
    for (const service of this.services) {
      if(service.id === serviceID) {
        service.setTypeID(typeID)
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
