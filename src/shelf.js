import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI';

class Read extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { books, shelf,  shelfChange} = this.props;
    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

            {books.filter((item) => item.shelf === shelf.shelf).map((bookDetails) => {
              let element =
                <li key={bookDetails.id}>
                  <div className="book">
                    <div className="book-top">
                      <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${bookDetails.imageLinks.smallThumbnail})` }}></div>
                      <div className="book-shelf-changer">
                        <select onChange={(event) => shelfChange(bookDetails.id, event.target.value)} value={bookDetails.shelf}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{bookDetails.title}</div>
                    {bookDetails.authors.map((author) => (
                      <div className="book-authors" key={author}>{author}</div>
                    ))}

                  </div>
                </li>
              return element
            })}

          </ol>
        </div>
      </div>
    );
  }
}

export default Read;