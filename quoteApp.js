class QuoteApp {
  constructor(quote, editor) {
    this.quote = quote
    this.editor = editor

    // Update editor
    for (const service of this.quote.services) {
      this.editor.addService(service)
    }
  }
}


const app = new QuoteApp(new Quote(), new QuoteEditor())
