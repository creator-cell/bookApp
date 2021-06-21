import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Shelf from './shelf'
import Search from './Search'
import { Link, Route } from "react-router-dom";


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
        <Route eaxct path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {this.state.shelves.map((shelf) => (
                  <div className="bookshelf" key={shelf.name}>
                    <h2 className="bookshelf-title">{shelf.name}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {this.state.books.filter((item) => item.shelf === shelf.shelf).map((bookDetails) => (
                          <Shelf book={bookDetails} shelfChange={(bookId, shelf) => this.handleShelfChange(bookId, shelf)} key={bookDetails.id} />
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Link  to='/search'>
              <div className="open-search">
                <button>Add a book</button>
              </div>
            </Link>
          </div>

        )}
        />

        <Route exact path='/search' render={() => (
          <Search shelfChange={(bookId, shelf) => this.handleShelfChange(bookId, shelf)} />
        )}
        />
      </div>

    )

  }
}

export default BooksApp
