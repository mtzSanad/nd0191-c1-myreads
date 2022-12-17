import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './component/Main';
import Search from './component/Search';
import * as BooksAPI from './BooksAPI';

function App() {
  const [bookList, setBookList] = useState([]);

  //Use useEffect to handle sideeffect of loading books
  useEffect(() => {
    (async () => {
      const books = await BooksAPI.getAll();
      setBookList(books);
    })();
  }, []);

  //change book event
  const selectShelfForBook = (book, shelf) => {
    //Calling bookShelfChange API
    BooksAPI.update(book, shelf);

    const newBookList = bookList?.filter((b) => book.id !== b.id);
    setBookList((prev) => [...newBookList, { ...book, shelf }]);
  };

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Main bookList={bookList} selectShelfForBook={selectShelfForBook} />
        }
      />
      <Route
        path="/search"
        element={
          <Search bookList={bookList} selectShelfForBook={selectShelfForBook} />
        }
      />
    </Routes>
  );
}

export default App;
