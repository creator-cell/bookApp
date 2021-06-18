import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'
 
class Read extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const books = this.props.books;
    console.log(books)
    
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

          {books.filter((item) => item.shelf === this.props.shelf.shelf).map((bookDetails) => {
            let element =
            <li key={bookDetails.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${bookDetails.imageLinks.smallThumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{bookDetails.title}</div>
                {bookDetails.authors.map((author)=>(
                  <div className="book-authors">{author}</div>
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