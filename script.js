// class: Book
class Book{
    constructor(title,author,isbn)
    {
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

// class Ui

class UI{
static displayBooks()
{
    const Books=store.getBooks();
    
    Books.forEach((book)=>UI.addBookToList(book));
}

    static addBookToList(book)
    {
  const list=document.querySelector('#book-list');

  const raw=document.createElement('tr');

  raw.innerHTML=`
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td> <a href="#" class="btn btn-danger btn-sm delete"></a>X</td>`;

  list.appendChild(raw);
    }
    static clearField()
    {
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }

    static deleteBook(el){
    if(el.classList.contains('delete'))
    {
        el.parentElement.parentElement.remove();
    }

    }

    // show alert

    static showAlert(message , className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));

        const container=document.querySelector('.container');
        const form=document.querySelector('#book-form');

        container.insertBefore(div,form);


        // vanish the time

        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }
    
}

// store class :store handle

class store{
    static getBooks(){
          let books;
          if(localStorage.getItem(books)===null)
          {
            books=[];
          }
          else{
            books=JSON.parse(localStorage.getItem('books'));
          }
          return books;
    }

    static addBook(book){
       const books=store.getBooks();
       books.push(book);
       localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(isbn){
       
    const books=store.getBooks();
    books.forEach((book,index)=>{
        if(book.isbn===isbn)
        {
            books.splice(index,1);
        }
    });
    localStorage.setItem('books',JSON.stringify(books));
}


}



//display books on screen

document.addEventListener('DOMContentLoaded',UI.displayBooks);


document.querySelector('#book-form').addEventListener('submit',(e)=>{

    // preventdefault

    e.preventDefault();
    //get form values

    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;

   
    //validate
if(title==='' || author==='' || isbn==='')
{
    UI.showAlert('please fill the fields','danger');
}
else{
     //instatiate new book
    const book=new Book(title,author,isbn);
    UI.addBookToList(book);
    UI.clearField();
    

    //add book to store
    store.addBook(book);
    UI.showAlert('book added','success');
}
  
});

// Event: Remove book from list
document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target)
});