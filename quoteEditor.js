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
}
customElements.define('tool-bar', ToolBar, { extends: 'div' })


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

    // Distance form
    this.distForm = new DistanceForm()

    // List of services - empty div
    this.services = document.createElement('div')

    // Append all
    this.append(title, this.distForm, this.services)
  }

  bindDistanceEdited(handler) {
    this.distForm.bindDistanceEdited(handler)
  }
}
customElements.define('services-section', ServicesSection, { extends: 'div' })


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

    // Section introduction
    const pDist = document.createElement('p')
    const textDistB = document.createTextNode(tr('With_main_distance'))
    this.distance = document.createElement('span')
    const textDistE = document.createTextNode(' km :')
    pDist.append(textDistB, this.distance, textDistE)

    // The detailed quote - empty div
    this.quote = document.createElement('div')

    // Append all
    this.append(title, pDist, this.quote)
  }

  updateAll(detailedQuote) {
    this.distance.textContent = detailedQuote.distance
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
    this.quote = new QuoteSection()

    this.app.append(this.toolbar, this.services, this.quote)
  }

  bindDistanceEdited(handler) {
    this.services.bindDistanceEdited(handler)
  }

  quoteUpdateAll(detailedQuote) {
    this.quote.updateAll(detailedQuote)
  }
}
