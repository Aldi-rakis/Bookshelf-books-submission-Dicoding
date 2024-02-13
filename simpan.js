const STORAGE_KEY = 'buku';
let books = [];

const checkStorage = () => {
  if(typeof(Storage) == undefined) {
    alert('Your Browser not support web storage');
    return false;
  }
  
  return true;
}

const saveData = () => {
  const parseData = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parseData);
  document.dispatchEvent(new Event('ondatasaved'));
}

const loadDatafromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(serializedData);
  
  if(data !== null)
    books = data;
  
  document.dispatchEvent(new Event('ondataloaded'));
}

const updateDataToStorage = () => {
  if(checkStorage())
    saveData();
}


const composeBookObject = (bookTitle, bookAuthor, bookYear, isCompleted) => {
  return {
    id: +new Date(),
    title: bookTitle,
    author: bookAuthor,
    year: bookYear,
    isComplete: isCompleted,
  };
};


const findBook = (bookId) => {
  for (book of books) {
    if(book.id === bookId)
      return book;
  }
  
  return null;
}

const findBookIndex = (bookId) => {
  let index = 0
  for (book of books) {
    if(book.id === bookId)
      return index;
 
    index++;
  }
 
   return -1;
}

const refreshDataFromBooks = () => {
  const bookUncompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
  let bookCompleted = document.getElementById(COMPLETED_BOOK_ID);

  for (book of books) {
    const newBook = makeBook(book.bookTitle, book.bookAuthor, book.bookYear , book.isCompleted);
    newBook[BOOK_ITEMID] = book.id;

    if (book.isCompleted) {
      bookCompleted.append(newBook);
    } else {
      bookUncompleted.append(newBook);
    }
  }
}