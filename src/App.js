import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Shelf from './shelf'
import Search from './Search'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    shelves: [
      { "shelf": "currentlyReading", "name": "Currently Reading" },
      { "shelf": "wantToRead", "name": "Want To Read" },
      { "shelf": "read", "name": "Read" }
    ]

  }

  // Make api call to get all books
  getAllBooks = () => {
    try {
      BooksAPI.getAll().then((response) => {
        if (response.length > 0) {
          this.setState({ books: response })
        }

      })
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getAllBooks();


  }


  handleShelfChange = (bookId, shelf) => {

    try {
      BooksAPI.update({ id: bookId }, shelf).then((response) => (
        this.setState((prevstate) => ({
          books: prevstate.books.filter(b => {
            if (b.id === bookId) {
              return (b.shelf = shelf);
            }
            else {
              return (response);
            }
          })
        })
        )
      ));
    } catch (error) {
      console.log(error)
    }
  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search shelfChange={(bookId, shelf) => this.handleShelfChange(bookId, shelf)} onNavigate={()=>{
            this.setState(()=>({
              showSearchPage: false
            }))
          }}/>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.state.shelves.map((shelf) => (
                    <Shelf books={this.state.books} shelf={shelf} shelfChange={(bookId, shelf) => this.handleShelfChange(bookId, shelf)} from="books"/>
                  ))}
                </div>
              </div>
              <div className="open-search">
                <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
              </div>
            </div>
          )}
      </div>
    )
  }
}

export default BooksApp
