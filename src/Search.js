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
    if (niddle) {
      try {
        BooksAPI.search(niddle).then((response) => {
          
          if (response && !response.hasOwnProperty("error")) {
            this.setState({ books: response })
            this.setState({ foundSearchData: true })
          } else {
            this.setState({ foundSearchData: false })

          }
        })
      } catch (error) {
        this.setState({ foundSearchData: false })
      }
    } else {
      this.setState({ foundSearchData: false })
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
    const { onNavigate, booksFromHomeShelf } = this.props
    const { books, foundSearchData } = this.state
    
    const updatedBooks = books.map((book) => {
          var result = booksFromHomeShelf.find(bookFromHome => bookFromHome.id === book.id)
          var shelf = "";
          if (result) {
            
            shelf = result.shelf
           
          }else{
            shelf = "none"
          }
          return {...book, shelf}
        })
     
    
    return (
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search" onClick={() => onNavigate}>Close</button>
            </Link>
            <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" onChange={(e) => this.handleSearch(e.target.value)} />
            </div>
          </div>
          <div className="search-books-results">
            {foundSearchData ? (
              <ol className="books-grid">
                {updatedBooks.map((bookDetails) => (
                  /* Check if the book is present in the shelf */
                  <Shelf book={bookDetails} shelfChange={(bookId, shelf) => this.addToShelf(bookId, shelf)} key={bookDetails.id} />
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