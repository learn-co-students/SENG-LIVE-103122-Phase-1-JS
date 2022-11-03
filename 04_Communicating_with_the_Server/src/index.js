function priceFormatter(price) {
  let formattedPrice = Number(price).toFixed(2);
  return `$${formattedPrice}`;
}
// Render Functions
function renderHeader(bookStore) {
  document.querySelector('header h1').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#store').textContent = bookStore.location;
}

// function: renderBook(book)
// --------------------------
// accepts a book object as an argument and creates
// an li something like this:
// <li class="list-li">
//   <h3>Eloquent JavaScript</h3>
//   <p>Marjin Haverbeke</p>
//   <p>$10.00</p>
//   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
// </li>
// appends the li to the ul#book-list in the DOM
function renderBook(book) {
    
  const li = document.createElement('li');
  li.className = 'list-li';
  
  const h3 = document.createElement('h3');
  h3.textContent = book.title;

  const pAuthor = document.createElement('p');
  pAuthor.textContent = book.author;
  
  const pPrice = document.createElement('p');
  pPrice.textContent = `${priceFormatter(book.price)}`;
  
  const pStock = document.createElement('p');
  pStock.className = "grey";
  if (book.inventory === 0) {
    pStock.textContent = "Out of stock";
  } else if (book.inventory < 3) {
    pStock.textContent = "Only a few left!";
  } else {
    pStock.textContent = "In stock"
  }
  
  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} cover`;

  const btn = document.createElement('button');
  btn.textContent = 'Delete';

  btn.addEventListener('click', (e) => {
    li.remove();
  })

  li.append(h3,pAuthor,pPrice,pStock,img,btn);
  document.querySelector('#book-list').append(li);
}

function priceFormatter(price) {
  let formattedPrice = Number(price).toFixed(2);
  return `$${formattedPrice}`;
}

// bookStore.inventory.forEach(renderBook);

// Event handlers 
const form = document.querySelector('#book-form');


// this is what a book looks like
// {
//   id:1,
//   title: 'Eloquent JavaScript: A Modern Introduction to Programming',
//   author: 'Marjin Haverbeke',
//   price: 10.00,
//   reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
//   inventory: 10,
//   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
// }
// we can use a book as an argument for renderBook!  This will add the book's info to the webpage.
form.addEventListener('submit', (e) => { 
  e.preventDefault();
  // pull the info for the new book out of the form
  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: e.target.price.value,
    reviews: [],
    inventory: e.target.inventory.value,
    imageUrl: e.target.imageUrl.value
  }
  // pass the info as an argument to renderBook for display!
  renderBook(book);
  e.target.reset();
})

//Invoking functions

// bookStore.inventory.forEach(renderBook)
// document.querySelector('#book-form').addEventListener('submit', handleForm)

console.log('about to fetch');
fetch('http://localhost:3000/stores/1')
  .then((res) => res.json())
  .then((bookStore) => {
    console.log(bookStore);
    renderHeader(bookStore)
    renderFooter(bookStore)
  })
  .catch(err => {
    console.error(err);
    makeError('Make sure to start json-server!')
  });

// load all the books and render them
fetch("http://localhost:3000/books")
  .then((res) => res.json())
  .then((books) => {
    console.log(books);
    books.forEach(book => renderBook(book))
  })
  .catch(err => {
    console.error(err);
    makeError('Make sure to start json-server!')
  });

function makeError(message) {
  const main = document.querySelector('main');
  const errorDiv = document.createElement('div');
  errorDiv.className = "error";
  errorDiv.textContent = message;
  main.prepend(errorDiv);
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
      errorDiv.remove();
    }
  })
}

console.log('fetch has been called');

//If I need to handle errors:
// this tells me that the status code of server response was in the ok range:

// fetch('http://localhost:3000/stores/4')
//   .then((res) => {
//     if (res.ok) {
//       return res.json();
//     } else {
//       console.log("whoops! Something went wrong");
//       console.error(res.status);
//     }
//   })

// this just tells me that I got a response from the server
// fetch('http://localhost:3000/stores/4')
//   .then((res) => res.json()) // resolves if I got a response from server (even if the response was an error)
//   .then(console.log)
//   .catch(error => { // catch doesn't run unless an error is thrown so we don't see these logs
//     console.log("an error occurred");
//     console.error(error);
//   })