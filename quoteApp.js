class QuoteApp {
  constructor(quote, editor) {
    this.quote = quote
    this.editor = editor
  }
}


const app = new QuoteApp(new Quote(), new QuoteEditor())
