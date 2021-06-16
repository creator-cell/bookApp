import React from 'react'
import './App.css'
import Shelf from './shelf'
import * as BooksAPI from './BooksAPI';
 
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    currentlyReading: [],
    wantToRead:[],
    read:[]
   
  }

  // Make api call to get all books
  getAllBooks = () => {
    try {
      BooksAPI.getAll().then((response) => {
        if (response.length > 0) {
          response.map((book) => {
            switch (book.shelf) {
              case "currentlyReading":
                
                this.setState(this.state.currentlyReading.concat([book]))
 
                break;
              case "wantToRead":
                this.setState(this.state.wantToRead.concat([book]))
                break;
              case "read":
                this.setState(this.state.read.concat([book]))
                break;
              default:
                break;
            }
          })
        }
      })
    } catch (error) {
      console.log(error);
    }
  }
  componentDidMount() {
    this.getAllBooks()

  }
  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author" />

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Shelf books={this.state.currentlyReading} shelfName="Currently Reading" />
                  <Shelf books={this.state.wantToRead} shelfName="Want To Read" />
                  <Shelf books={this.state.read} shelfName="Read" />
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
