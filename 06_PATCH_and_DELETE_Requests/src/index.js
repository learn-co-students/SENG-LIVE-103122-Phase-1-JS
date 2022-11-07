// Rendering functions
// Renders Header
function renderHeader(store){
  document.querySelector('h1').textContent = store.name
}
// Renders Footer
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
  pPrice.textContent = priceFormatter(book.price);
  
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

// New Function to populate the store form with a store's data to update 
function populateStoreEditForm(store) {
  const form = document.querySelector('#store-form');
  form.name.value = store.name;
  form.location.value = store.location;
  form.address.value = store.address;
  form.number.value = store.number;
  form.hours.value = store.hours;
  showStoreForm();
}

function priceFormatter(price) {
  let formattedPrice = Number(price).toFixed(2);
  return `$${formattedPrice}`;
}

// Event Handlers

// Book Form button
const toggleBookFormButton = document.querySelector('#toggleBookForm');
const bookForm = document.querySelector('#book-form');
let bookFormVisible = false;

function toggleBookForm() {
  if (bookFormVisible) {
    hideBookForm();
  } else {
    showBookForm();
  }
}

function showBookForm() {
  bookFormVisible = true;
  bookForm.classList.remove('collapsed');
  toggleBookFormButton.textContent = "Hide Book form";
}

function hideBookForm() {
  bookFormVisible = false;
  bookForm.classList.add('collapsed');
  toggleBookFormButton.textContent = "New Book";
}

toggleBookFormButton.addEventListener('click', toggleBookForm);

// Store Form button
const toggleStoreFormButton = document.querySelector('#toggleStoreForm');
const storeForm = document.querySelector('#store-form');
let storeFormVisible = false;

function toggleStoreForm() {
  if (storeFormVisible) {
    hideStoreForm();
  } else {
    showStoreForm();
  }
}

function hideStoreForm() {
  document.querySelector('#store-form').classList.add('collapsed');
  storeFormVisible = false;
  toggleStoreFormButton.textContent = "New Store";
}

function showStoreForm() {
  document.querySelector('#store-form').classList.remove('collapsed');
  storeFormVisible = true;
  toggleStoreFormButton.textContent = "Hide Store form";
}

toggleStoreFormButton.addEventListener('click', toggleStoreForm);

// allow escape key to hide either form
window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
    hideStoreForm();
    hideBookForm();
  }
})

// book form submit
bookForm.addEventListener('submit', (e) => { 
  e.preventDefault();
  // pull the info for the new book out of the form
  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: e.target.price.value,
    reviews: [],
    inventory: Number(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value
  }
    
  // pessimistic rendering here:
  postJSON("http://localhost:3000/books", book)
    .then(book => {
      renderBook(book)
      e.target.reset();
    });  
})

// store form submit

storeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // debugger;
  const store = {};
  store.name = e.target.name.value;
  store.address = e.target.address.value;
  store.number = e.target.number.value;
  store.hours = e.target.hours.value;
  store.location = e.target.location.value;
  // {
  //     "id": 1, // will be assigned by the database
  //     "location": "Seattle",
  //     "address": "333 st ne Seattle wa 99999",
  //     "number": 9999999999,
  //     "name": "Easley's Technical Books",
  //     "hours": "Monday - Friday 9am - 6pm"
  //   },
  if (storeEditMode) {
    // ✅ write code for updating the store here
    
    storeEditMode = false;
  } else {
    fetch("http://localhost:3000/stores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(store)
    })
      .then(res => res.json())
      .then(addSelectOptionForStore)
  }
})

// edit store button
const editStoreBtn = document.querySelector('#edit-store');
let storeEditMode = false;

editStoreBtn.addEventListener('click', (e) => {
  const selectedStoreId = document.querySelector('#store-selector').value;
  getJSON(`http://localhost:3000/stores/${selectedStoreId}`)
    .then(populateStoreEditForm)
})


// Invoking functions    
// fetching our data!
getJSON('http://localhost:3000/stores')
  .then((stores) => {
    // this populates a select tag with options so we can switch between stores on our web page
    renderStoreSelectionOptions(stores);
    renderHeader(stores[0])
    renderFooter(stores[0])
  })
  .catch(err => {
    console.error(err);
  });

getJSON('http://localhost:3000/books')
  .then(books => books.forEach(renderBook))
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