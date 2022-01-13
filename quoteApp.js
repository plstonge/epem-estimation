class QuoteApp {
  constructor(quote, editor) {
    this.quote = quote
    this.editor = editor

    // Distance change bindings
    this.quote.bindDistanceChanged(this.onDistanceChanged)
    this.editor.bindDistanceEdited(this.handleDistanceChanged)

    // Update editor
    this.onDistanceChanged(this.quote.detailedQuote)
  }

  handleDistanceChanged = (distance) => {
    this.quote.setDistance(distance)
  }

  onDistanceChanged = (detailedQuote) => {
    this.editor.quote.updateAll(detailedQuote)
  }
}


const app = new QuoteApp(new Quote(), new QuoteEditor())
