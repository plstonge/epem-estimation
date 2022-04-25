/**
 * Logger for the model - increase debugLevel in code to get more debug info
 * @param {*} requiredLevel - required debug level defined by caller
 * @param {*} message - the message to print in console
 */
function modelLog(message, requiredLevel = 0) {
  const debugLevel = 0  // Edit me - 0 by default

  if (debugLevel >= requiredLevel) console.log(message)
}


/**
 * @class EpemService
 *
 * Information about one service
 */
class EpemService {
  constructor(uniqueID, typeID) {
    this.id = uniqueID    // Object ID
    this.typeID = typeID  // Service ID

    this.duration = 30  // 30 minutes
    this.freqID = 24    // Once a day

    this.startDT = new Date()  // Today
    this.untilDT = new Date()  // Today
  }

  setTypeID(typeID) {
    this.typeID = typeID

    // Log information to console
    modelLog('Service[' + this.id + '].typeID === ' + this.typeID, 1)
  }
}


/**
 * @class Quote
 *
 * Main quote class - managing service queries
 */
class Quote {
  constructor() {
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
    let uniqueID = 1
    let typeID = 1  // Default is Pet Sitting

    // Compute new unique ID
    if (this.services.length > 0) {
      uniqueID = this.services[this.services.length - 1].id + 1
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
      if (service.id === serviceID) {
        service.setTypeID(typeID)
        this.modified = true
        break
      }
    }
  }

  startNew() {
    // Reset the internal data
    this.initialVisit = false
    this.returningKey = false
    this.services = []

    // Add one service
    this.serviceAdd()

    // A new quote is considered non-modified
    this.modified = false
  }
}
