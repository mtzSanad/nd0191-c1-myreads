import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

const Search = ({ bookList, selectShelfForBook }) => {
  //searching for book, state used to control search input
  const [search, setSearch] = useState('');
  //Sate used to render book result of search
  const [searchBooksList, setSearchBooksList] = useState([]);

  //Handling side effects of book search
  useEffect(() => {
    (async () => {
      try {
        //Garding calling API with any false value
        if (search) {
          const result = await BooksAPI.search(search);
          //Handling success response with error from API
          if (result?.error) {
            setSearchBooksList([]);
          } else {
            //Updating book shelf to match App books shelfs, API dosen't set it correctly
            result?.forEach((searchBook) => {
              //Setting default shelf to none
              searchBook.shelf = 'none';
              //Looping through application books to match any book from search result
              bookList.forEach((appBook) => {
                if (searchBook.id === appBook.id) {
                  searchBook.shelf = appBook.shelf;
                }
              });
            });
            setSearchBooksList(result);
          }
        } else {
          setSearchBooksList([]);
        }
      } catch (e) {
        //In case of any error happened render empty list
        setSearchBooksList([]);
      }
    })();
  }, [search, bookList]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchBooksList &&
            searchBooksList?.map((book) => (
              <Book
                key={book.id}
                book={book}
                selectShelfForBook={selectShelfForBook}
              />
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
