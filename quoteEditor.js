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
 * @class ServiceSelector
 *
 * Selector of one service
 */
class ServiceSelector extends HTMLDivElement {
  constructor(service_id, type_id) {
    super()

    // Bootstrap 5 attributes
    this.classList.add('form-floating')

    // The selector
    this.selector = document.createElement('select')
    this.selector.id = 'type_' + service_id
    this.selector.classList.add('form-select', 'service-type')

    // For each pricing.js::service_types
    for (const service_type of service_types) {
      const opt = document.createElement('option')
      opt.value = service_type.id
      opt.text = service_type.name
      this.selector.add(opt)
    }
    this.selector.value = type_id

    // Label before the service selector
    const typeLabel = document.createElement('label')
    typeLabel.setAttribute('for', this.selector.id)
    typeLabel.textContent = tr('Type_of_service')

    this.append(this.selector, typeLabel)
  }
}
customElements.define('service-selector', ServiceSelector, { extends: 'div' })


/**
 * @class ServiceEditor
 *
 * Editor of one service
 */
 class ServiceEditor extends HTMLDivElement {
  constructor(service) {
    super()

    this.id = 'service_' + service.id

    // Bootstrap 5 attributes
    this.classList.add('border', 'mb-1', 'p-1', 'rounded')

    // Drop-down type selector
    const typeSelect = new ServiceSelector(service.id, service.type_id)

    this.append(typeSelect)
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
      if (event.target.className === 'form-select service-type') {
        handle(event.target.id.split('_')[1], event.target.value)
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
