import React from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Shelf from './shelf'
import Search from './Search'
import { Link, Route, Switch, BrowserRouter } from "react-router-dom";


class BooksApp extends React.Component {
  state = {
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
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={() => (
            <div className="app">
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
                              <Shelf book={bookDetails} shelfChange={(bookId, shelf) => this.handleShelfChange(bookId, shelf)} key={bookDetails.id} fromSearch="false"/>
                            ))}
                          </ol>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <Link to='/search'>
                  <div className="open-search">
                    <button>Add a book</button>
                  </div>
                </Link>
              </div>
            </div>

          )}
          />

          <Route exact path='/search' render={() => (
            <Search shelfChange={(bookId, shelf) => this.handleShelfChange(bookId, shelf)} booksFromHomeShelf={this.state.books} shelves= {this.state.shelves}/>
          )}
          />
        </Switch>
      </BrowserRouter>

    )
  }
}

export default BooksApp
