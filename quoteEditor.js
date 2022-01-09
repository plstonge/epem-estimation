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
 * @class QuoteEditor
 *
 * The main app user interface
 */
class QuoteEditor {
  constructor() {
    this.app = document.getElementById('quoteEditor')

    this.toolbar = new ToolBar()
    this.app.append(this.toolbar)
  }
}
