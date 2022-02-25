/**
 * @class ToolBarButton
 *
 * Button for tool-bars
 */
class ToolBarButton extends HTMLButtonElement {
  constructor(textContent) {
    super()

    // Bootstrap 5 attributes
    this.classList.add('btn', 'btn-secondary')
    this.setAttribute('type', 'button')

    // Displayed text
    this.textContent = textContent
  }
}
customElements.define('toolbar-button', ToolBarButton, { extends: 'button' })


/**
 * @class ToolBarGroup
 *
 * Group of buttons in a tool-bar
 */
class ToolBarGroup extends HTMLDivElement {
  constructor(name) {
    super()

    // Bootstrap 5 attributes
    this.classList.add('btn-group')
    this.setAttribute('role', 'group')
    this.setAttribute('aria-label', name)
  }
}
customElements.define('toolbar-group', ToolBarGroup, { extends: 'div' })


/**
 * @class ToolBar
 *
 * The app tool-bar and buttons
 */
class ToolBar extends HTMLDivElement {
  constructor() {
    super()

    // Bootstrap 5 attributes
    this.classList.add('btn-toolbar')
    this.setAttribute('role', 'toolbar')
    this.setAttribute('aria-label', 'Toolbar with button groups')

    // Button group for the New button
    this.groupNew = new ToolBarGroup('group_new')
    this.buttonNew = new ToolBarButton(tr('New_quote'))

    this.groupNew.append(this.buttonNew)
    this.append(this.groupNew)
  }

  bindNewClicked(handle) {
    this.buttonNew.addEventListener('click', handle)
  }
}
customElements.define('tool-bar', ToolBar, { extends: 'div' })


/**
 * Creates a div object with a 'col*' class and a minimum width value
 * @param {*} child - input object or another div
 * @param {*} colClass - 'col' default column class
 * @param {*} minWidth - '1in' default minimum width
 * @returns the div with proper classes and the internal child object
 */
function createDivCol(child, colClass='col', minWidth='1in') {
  const divCol = document.createElement('div')
  divCol.classList.add(colClass)
  divCol.style.minWidth = minWidth
  divCol.append(child)
  return divCol
}


/**
 * Creates a div with class 'form-floating'
 * @param {*} input - input object to be labeled
 * @param {*} label - the label object
 * @returns the div with class 'form-floating'
 */
function createDivFloat(input, label) {
  const divFloat = document.createElement('div')
  divFloat.classList.add('form-floating')
  divFloat.append(input, label)
  return divFloat
}


/**
 * Creates a div with the class 'row' and other classes
 * @param {...any} classes - optional additional classes
 * @returns the div object with classes 'row' and other classes
 */
function createDivRow(...classes) {
  const divRow = document.createElement('div')
  divRow.classList.add('row', ...classes)
  return divRow
}


/**
 * Creates a label object to be attached to an input object
 * @param {*} forID - id of object to be labeled
 * @returns the label object
 */
function createLabel(forID) {
  const label = document.createElement('label')
  label.setAttribute('for', forID)
  return label
}


/**
 * Creates a date input selector
 * @param {*} dt - timestamp from which the local date is taken
 * @returns the date input selector with the given date
 */
function createSelectorDate(dt) {
  const di = document.createElement('input')  // Date input
  di.classList.add('form-select')
  di.setAttribute('type', 'date')
  di.setAttribute('value', dt.toLocaleDateString())
  return di
}


/**
 * @class SelectorFloatLabel
 *
 * Selector with floating label
 */
class SelectorFloatLabel extends HTMLDivElement {
  constructor(groupName, numID, options, defaultOptionID) {
    super()

    // Bootstrap 5 attributes
    this.classList.add('form-floating', 'mb-1')

    // The selector
    this.selector = document.createElement('select')
    this.selector.id = groupName + '.' + numID
    this.selector.classList.add('form-select', groupName)

    // For each option
    for(const option of options) {
      const opt = document.createElement('option')
      opt.value = option.id
      opt.text = option.name
      this.selector.add(opt)
    }
    this.selector.value = defaultOptionID

    // Label before the selector
    const label = createLabel(this.selector.id)
    label.textContent = tr(groupName)

    this.append(this.selector, label)
  }
}
customElements.define('selector-float-label', SelectorFloatLabel, { extends: 'div' })


/**
 * @class TimePeriodEditor
 *
 * Time Period Editor
 */
class TimePeriodEditor extends HTMLDivElement {
  constructor(groupName, numID, startDT, untilDT) {
    super()

    // Bootstrap 5 classes: margin-bottom-1
    this.classList.add('mb-1')

    // Main objects gathered in a dictionary
    this.startDate = createSelectorDate(startDT)
    this.untilDate = createSelectorDate(untilDT)

    const dictDT = {
      'start': {dateSelector: this.startDate},
      'until': {dateSelector: this.untilDate},
    }

    // Display date selectors in a row
    const divRowDates = createDivRow('g-1')  // g == spacing between columns

    for (const [startUntil, dt] of Object.entries(dictDT)) {
      const className = groupName + '_' + startUntil + '_date'
      dt.dateSelector.id = className + '.' + numID
      dt.dateSelector.classList.add(className)

      const dateLabel = createLabel(dt.dateSelector.id)
      dateLabel.textContent = tr(className)

      divRowDates.append(
        createDivCol(
          createDivFloat(dt.dateSelector, dateLabel), 'col-6', '2.5in'))
    }

    this.append(divRowDates)
  }
}
customElements.define('time-period-editor', TimePeriodEditor, { extends: 'div' })


/**
 * @class ServiceEditor
 *
 * Editor of one service
 */
 class ServiceEditor extends HTMLDivElement {
  constructor(service) {
    super()

    const groupName = 'Service'
    this.id = groupName + '.' + service.id

    // Bootstrap 5 attributes
    this.classList.add('border', 'mb-1', 'p-1', 'rounded')

    // Drop-down type selector
    const typeSelector = new SelectorFloatLabel(
      groupName + '_type', service.id, serviceTypes, service.typeID)

    // Start/Until Date/Time selectors
    const timePeriod = new TimePeriodEditor(
      groupName, service.id, service.startDT, service.untilDT)

    this.append(typeSelector, timePeriod)
  }
}
customElements.define('service-editor', ServiceEditor, { extends: 'div' })


/**
 * @class ServicesSection
 *
 * The app Services section
 */
class ServicesSection extends HTMLDivElement {
  constructor() {
    super()

    // Section title
    const title = document.createElement('h2')
    title.textContent = tr('Select_services')

    // List of services - empty div
    this.services = document.createElement('div')

    // Add button
    this.buttonAdd = document.createElement('button')
    this.buttonAdd.classList.add('btn', 'btn-secondary')
    this.buttonAdd.setAttribute('type', 'button')
    this.buttonAdd.textContent = tr('Add_service')

    // Append all
    this.append(title, this.services, this.buttonAdd)
  }

  add(service) {
    const newServiceEditor = new ServiceEditor(service)
    this.services.append(newServiceEditor)
  }

  bindAddClicked(handle) {
    this.buttonAdd.addEventListener('click', handle)
  }

  bindTypeChanged(handle) {
    this.services.addEventListener('change', (event) => {
      if (event.target.className === 'form-select Service_type') {
        const serviceID = parseInt(event.target.id.split('.')[1])
        const typeID = event.target.value
        handle(serviceID, typeID)
      }
    })
  }

  reset() {
    while (this.services.firstChild) {
      this.services.removeChild(this.services.firstChild)
    }
  }
}
customElements.define('services-section', ServicesSection, { extends: 'div' })


/**
 * @class DistanceForm
 *
 * Distance editor
 */
class DistanceForm extends HTMLFormElement {
  constructor() {
    super()

    // Label before distance input
    const distLabel = document.createElement('label')
    distLabel.setAttribute('for', 'distance')
    distLabel.style = 'margin-right: 6px;'
    distLabel.textContent = tr('Distance_to_destination')

    // The distance input field
    this.distance = document.createElement('input')
    this.distance.id = 'distance'
    this.distance.type = 'number'
    this.distance.min = distance_properties.min
    this.distance.max = distance_properties.max
    this.distance.value = distance_properties.default
    this.distance.style = 'width: 1in;'

    // Distance units - km
    const distUnits = document.createElement('label')
    distUnits.setAttribute('for', 'distance')
    distUnits.style = 'margin-left: 6px;'
    distUnits.textContent = "km"

    this.append(distLabel, this.distance, distUnits)
  }

  bindDistanceEdited(handler) {
    const handleNewDistance = (event) => {
      handler(parseFloat(event.target.value))
    }

    this.distance.addEventListener('change', (event) => {
      handleNewDistance(event)
    })
    this.distance.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault()
        handleNewDistance(event)
      }
    })
  }
}
customElements.define('distance-form', DistanceForm, { extends: 'form' })


/**
 * @class StaffSection
 *
 * The app Staff section
 */
class StaffSection extends HTMLDivElement {
  constructor() {
    super()

    // Section title
    const title = document.createElement('h2')
    title.textContent = tr('Select_staff_members')

    // List of staff members - empty div
    this.staff = document.createElement('div')

    // Append all
    this.append(title, this.staff)
  }
}
customElements.define('staff-section', StaffSection, { extends: 'div' })


/**
 * @class QuoteSection
 *
 * The app Quote section
 */
class QuoteSection extends HTMLDivElement {
  constructor() {
    super()

    // Section title
    const title = document.createElement('h2')
    title.textContent = tr('Quote')

    // The detailed quote - empty div
    this.quote = document.createElement('div')

    // Append all
    this.append(title, this.quote)
  }
}
customElements.define('quote-section', QuoteSection, { extends: 'div' })


/**
 * @class QuoteEditor
 *
 * The main app user interface
 */
class QuoteEditor {
  constructor() {
    this.app = document.getElementById('quoteEditor')

    this.toolbar = new ToolBar()
    this.services = new ServicesSection()
    this.staff = new StaffSection()
    this.quote = new QuoteSection()

    this.app.append(this.toolbar, this.services, this.staff, this.quote)
  }

  bindNewClicked(handle) {
    this.toolbar.bindNewClicked(handle)
  }

  bindServiceAddClicked(handle) {
    this.services.bindAddClicked(handle)
  }

  bindServiceTypeChanged(handle) {
    this.services.bindTypeChanged(handle)
  }

  reset() {
    this.services.reset()
  }

  serviceAdd(service) {
    this.services.add(service)
  }
}
