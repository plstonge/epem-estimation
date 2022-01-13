/**
 * @class ButtonGroup
 *
 * Group of buttons in a tool-bar
 */
class ButtonGroup extends HTMLDivElement {
  constructor(name) {
    super()

    // Bootstrap 5 attributes
    this.classList.add('btn-group')
    this.setAttribute('role', 'group')
    this.setAttribute('aria-label', name)
  }
}
customElements.define('button-group', ButtonGroup, { extends: 'div' })


/**
 * @class ToolBarButton
 *
 * Button for tool-bars
 */
class ToolBarButton extends HTMLButtonElement {
  constructor(name) {
    super()

    // Bootstrap 5 attributes
    this.classList.add('btn', 'btn-secondary')
    this.setAttribute('type', 'button')
    this.textContent = name
  }
}
customElements.define('toolbar-button', ToolBarButton, { extends: 'button' })


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
    this.groupNew = new ButtonGroup('Group New')
    this.buttonNew = new ToolBarButton('Nouvelle soumission')

    this.groupNew.append(this.buttonNew)
    this.append(this.groupNew)
  }
}
customElements.define('tool-bar', ToolBar, { extends: 'div' })


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
    title.textContent = 'Sélection de services'

    // Distance form
    const distForm = document.createElement('form')

    const distLabel = document.createElement('label')
    distLabel.setAttribute('for', 'distance')
    distLabel.style = 'margin-right: 6px;'
    distLabel.textContent = "Distance de transport à l'aller :"

    this.distance = document.createElement('input')
    this.distance.type = 'number'
    this.distance.id = 'distance'
    this.distance.min = '0'
    this.distance.max = '255'
    this.distance.value = '0'
    this.distance.style = 'width: 1in;'

    const distUnits = document.createElement('label')
    distUnits.setAttribute('for', 'distance')
    distUnits.style = 'margin-left: 6px;'
    distUnits.textContent = "km"

    distForm.append(distLabel, this.distance, distUnits)

    // List of services - empty div
    this.services = document.createElement('div')

    // Append all
    this.append(title, distForm, this.services)
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
    title.textContent = 'Soumission'

    // Section introduction
    const pDist = document.createElement('p')
    const textDistB = document.createTextNode('Étant donné un déplacement de ')
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
    const handleNewDistance = (event) => {
      const distance = parseFloat(event.target.value)
      if (!isNaN(distance) && distance >= 0) {
        handler(distance)
      }
    }
    this.services.distance.addEventListener('change', (event) => {
      handleNewDistance(event)
    })
    this.services.distance.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        event.preventDefault()
        handleNewDistance(event)
      }
    })
  }
}
