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
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">

          {books.map((bookDetails) => {
            let element =
            <li>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: 'url("")' }}></div>
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
                <div className="book-authors">J.R.R. Tolkien</div>
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