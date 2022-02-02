class QuoteApp {
  constructor(quote, editor) {
    this.quote = quote
    this.editor = editor

    // Bind events from Quote
    this.quote.bindServiceAdded(this.onServiceAdded)

    // Bind events from Editor
    this.editor.bindNewClicked(this.handleNewClicked)
    this.editor.bindAddServiceClicked(this.handleAddServiceClicked)

    // Start with a new quote
    this.quote.startNew()
  }

  handleAddServiceClicked = () => {
    this.quote.addService()
  }

  handleNewClicked = () => {
    if (this.quote.modified && confirm(tr('Confirm_New'))) {
      this.editor.reset()
      this.quote.startNew()
    }
  }

  onServiceAdded = (service) => {
    this.editor.addService(service)
  }
}


const app = new QuoteApp(new Quote(), new QuoteEditor())
