// Rendering functions
// Renders Header
function renderHeader(bookStore) {
  document.querySelector('header h1').textContent = bookStore.name;
}

function renderFooter(bookStore) {
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#store').textContent = bookStore.location;
}

// adds options to a select tag that allows swapping between different stores
function renderStoreSelectionOptions(stores) {
  // target the select tag
  const storeSelector = document.querySelector('#store-selector');
  // clear out any currently visible options
  storeSelector.innerHTML = "";
  // add an option to the select tag for each store
  stores.forEach(addSelectOptionForStore)
  // add a listener so that when the selection changes, we fetch that store's data from the server and load it into the DOM
  storeSelector.addEventListener('change', (e) => {
    getJSON(`http://localhost:3000/stores/${e.target.value}`)
      .then(store => {
        renderHeader(store);
        renderFooter(store);
      })
  })
}

const storeSelector = document.querySelector('#store-selector');

function addSelectOptionForStore(store) {
  const option = document.createElement('option');
  // the option value will appear within e.target.value
  option.value = store.id;
  // the options textContent will be what the user sees when choosing an option
  option.textContent = store.name;
  storeSelector.append(option);
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

// Event Handlers
const toggleBookFormButton = document.querySelector('#toggleBookForm');
let bookFormVisible = false;

function toggleBookForm() {
  const form = document.querySelector('#book-form')
  form.classList.toggle('collapsed')
  if (form.classList.contains('collapsed')) {
    bookFormVisible = false;
    toggleBookFormButton.textContent = "New Book";
  } else {
    bookFormVisible = true;
    toggleBookFormButton.textContent = "Hide Book form";
  }
}

toggleBookFormButton.addEventListener('click', toggleBookForm);

const toggleStoreFormButton = document.querySelector('#toggleStoreForm');
let storeFormVisible = false;

function toggleStoreForm() {
  const form = document.querySelector('#store-form')
  form.classList.toggle('collapsed')
  if (form.classList.contains('collapsed')) {
    storeFormVisible = false;
    toggleStoreFormButton.textContent = "New Store";
  } else {
    storeFormVisible = true;
    toggleStoreFormButton.textContent = "Hide Store form";
  }
}

toggleStoreFormButton.addEventListener('click', toggleStoreForm);

window.addEventListener('keydown', (e) => {
  console.log(e);
  console.log(e.key);
  if (e.key === "Escape") {
    if (storeFormVisible) {
      toggleStoreForm();
    }
    if (bookFormVisible) {
      toggleBookForm();
    }
  }
})
const bookForm = document.querySelector('#book-form');
// this is what a book looks like in db.json
// {
//   id:1,
//   title: 'Eloquent JavaScript: A Modern Introduction to Programming',
//   author: 'Marjin Haverbeke',
//   price: 10.00,
//   reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
//   inventory: 10,
//   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
// }
// we can use a book as an argument for renderBook!  This will add the book's info to the webpage.
bookForm.addEventListener('submit', (e) => { 
  e.preventDefault();
  // pull the info for the new book out of the form
  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: Number(e.target.price.value),
    reviews: [],
    inventory: Number(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value
  }
  // pass the info as an argument to renderBook for display!
  renderBook(book);
  // 1. Add the ability to perist the book to the database when the form is submitted. When this works, we should still see the book that is added to the DOM on submission when we refresh the page.

  e.target.reset();
})

// 2. Hook up the new Store form so it that it works to add a new store to our database and also to the DOM (as an option within the select tag)


// Invoking functions    
// fetching our data!
fetch('http://localhost:3000/stores')
  .then((res) => res.json())
  .then((stores) => {
    // this populates a select tag with options so we can switch between stores on our web page
    renderStoreSelectionOptions(stores);
    renderHeader(stores[0])
    renderFooter(stores[0])
  })
  .catch(err => {
    console.error(err);
    // makeError('Make sure to start json-server!') // I'm skipping this so we only see this error message once if JSON-server is actually not running
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
