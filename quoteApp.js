class QuoteApp {
  constructor(quote, editor) {
    this.quote = quote
    this.editor = editor

    // Bind events from Quote
    this.quote.bindServiceAdded(this.onServiceAdded)

    // Bind events from Editor
    this.editor.bindNewClicked(this.handleNewClicked)

    this.editor.bindServiceAddClicked(this.handleServiceAddClicked)
    this.editor.bindServiceTypeChanged(this.handleServiceTypeChanged)

    // Start with a new quote
    this.quote.startNew()
  }

  handleNewClicked = () => {
    if (this.quote.modified && confirm(tr('Confirm_New'))) {
      this.editor.reset()
      this.quote.startNew()
    }
  }

  handleServiceAddClicked = () => {
    this.quote.serviceAdd()
  }

  handleServiceTypeChanged = (service_id, type_id) => {
    this.quote.serviceSetTypeID(service_id, type_id)
  }

  onServiceAdded = (service) => {
    this.editor.serviceAdd(service)
  }
}


const app = new QuoteApp(new Quote(), new QuoteEditor())
