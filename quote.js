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

  bindInitialVisitChanged(callback) {
    this.onInitialVisitChanged = callback
  }

  bindReturningKeyChanged(callback) {
    this.onReturningKeyChanged = callback
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

  setInitialVisit(enabled) {
    this.initialVisit = enabled
    this._callBack(this.onInitialVisitChanged, enabled)
    this.modified = true

    // Log information to console
    modelLog('Initial visit ' + (enabled ? 'enabled' : 'disabled'), 1)
  }

  setReturningKey(enabled) {
    this.returningKey = enabled
    this._callBack(this.onReturningKeyChanged, enabled)
    this.modified = true

    // Log information to console
    modelLog('Returning key ' + (enabled ? 'enabled' : 'disabled'), 1)
  }

  startNew() {
    // Reset the internal data
    this.setInitialVisit(false)
    this.setReturningKey(false)

    // Add one service
    this.services = []
    this.serviceAdd()

    // A new quote is considered non-modified
    this.modified = false
  }
}
