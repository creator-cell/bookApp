import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import Shelf from './shelf'
import { Link } from "react-router-dom";


class Read extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: [],
      foundSearchData: false
    }
  }
  handleSearch = (niddle) => {
    try {
      BooksAPI.search(niddle).then((response) => {
        if (response) {
          this.setState({ books: response })
          this.setState({ foundSearchData: true })
          console.log(response)
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  addToShelf = (bookId, shelf) => {
    try {
      BooksAPI.update({ id: bookId }, shelf).then((response) => (
        this.setState((prevstate) => ({
          books: prevstate.books.filter(b => {
            return b.id !== bookId
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
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search" onClick={() => this.props.onNavigate}>Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.handleSearch(e.target.value)} />
          </div>
        </div>

        <div className="search-books-results">
          {this.state.foundSearchData ? (
            <ol className="books-grid">
              {this.state.books.map((bookDetails) => (
                <Shelf book={bookDetails} shelfChange={(bookId, shelf) => this.addToShelf(bookId, shelf)} />
              ))}
            </ol>

          ) : (
              <div>
                <h1>Oops! No Results Found</h1>
              </div>
            )}
        </div>
      </div>
    );
  }
}

export default Read;