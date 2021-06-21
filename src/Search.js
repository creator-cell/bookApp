import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'


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
          <button className="close-search" onClick={() => this.props.onNavigate}>Close</button>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" onChange={(e) => this.handleSearch(e.target.value)} />

          </div>
        </div>

        <div className="search-books-results">
          {this.state.foundSearchData ? (
            <ol className="books-grid">
              {this.state.books.map((bookDetails) => {

                let element =
                  <li key={bookDetails.id}>
                    <div className="book">
                      <div className="book-top">
                        {bookDetails.imageLinks ? (
                          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${bookDetails.imageLinks.smallThumbnail})` }}></div>
                        ) : (
                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url()` }}></div>
                          )}

                        <div className="book-shelf-changer">
                          <select onChange={(event) => this.addToShelf(bookDetails.id, event.target.value)} value={"none"}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{bookDetails.title}</div>
                      {bookDetails.authors ? (
                        bookDetails.authors.map((author) => (
                          <div className="book-authors" key={author}>{author}</div>
                        ))
                      ) : (<div className="book-authors" key=""></div>)}


                    </div>
                  </li>
                return element
              })}
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