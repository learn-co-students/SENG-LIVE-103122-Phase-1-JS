renderHeader(bookStore);
renderFooter(bookStore);
bookStore.inventory.forEach(renderBook);

function priceFormatter(price) {
  let formattedPrice = Number(price).toFixed(2);
  return `$${formattedPrice}`;
}
// create a function renderHeader() that takes the store name from bookStore and adds to the DOM
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
    pPrice.textContent = priceFormatter(book.price);
    
    const img = document.createElement('img');
    img.src = book.imageUrl;
    img.alt = `${book.title} cover`;

    const btn = document.createElement('button');

    btn.textContent = 'Delete';

    li.append(h3,pAuthor,pPrice,img,btn);
    document.querySelector('#book-list').append(li);
}

const toggleFormButton = document.querySelector('#toggleForm');
let formVisible = false;

function toggleForm() {
  const form = document.querySelector('#book-form')
  form.classList.toggle('collapsed')
  if (form.classList.contains('collapsed')) {
    formVisible = false;
    toggleFormButton.textContent = "New Book";
  } else {
    formVisible = true;
    toggleFormButton.textContent = "Hide Book form";
  }
}
toggleFormButton.addEventListener('click', toggleForm);

window.addEventListener('keydown', (e) => {
  console.log(e);
  console.log(e.key);
  if (e.key === "Escape" && formVisible) {
    toggleForm();
  }
})

const newBookForm = document.querySelector('#book-form');

newBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // we want our book object that we're going to pass to renderBook to look like the below:
  // {
  //   title: 'Eloquent JavaScript: A Modern Introduction to Programming',
  //   author: 'Marjin Haverbeke',
  //   price: 10.00,
  //   inventory: 10,
  //   imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
  // },
  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: e.target.price.value,
    inventory: e.target.inventory.value,
    imageUrl: e.target.imageUrl.value
  }
  renderBook(book);
  toggleForm();
  e.target.reset();
})