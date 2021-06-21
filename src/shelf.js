import React, { Component } from 'react'
import './App.css'

class Read extends Component {
  render() {
    const { book, shelfChange } = this.props;
    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            {book.imageLinks ? (
              <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
            ) : (
                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url()` }}></div>
              )}
            <div className="book-shelf-changer">
              <select onChange={(event) => shelfChange(book.id, event.target.value)} value={book.shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors ? (
            book.authors.map((author) => (
              <div className="book-authors" key={author}>{author}</div>
            ))
          ) : (<div className="book-authors" key=""></div>)
          }
        </div>
      </li>
    );
  }
}

export default Read;