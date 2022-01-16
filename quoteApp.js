class QuoteApp {
  constructor(quote, editor) {
    this.quote = quote
    this.editor = editor

    // To-view bindings
    this.quote.bindAllChanged(this.onQuoteAllChanged)

    // To-model bindings
    this.editor.bindDistanceEdited(this.handleDistanceChanged)

    // Update editor
    this.onQuoteAllChanged(this.quote.detailedQuote)
  }

  handleDistanceChanged = (distance) => {
    this.quote.setDistance(distance)
  }

  onQuoteAllChanged = (detailedQuote) => {
    this.editor.quoteUpdateAll(detailedQuote)
  }
}


const app = new QuoteApp(new Quote(), new QuoteEditor())
