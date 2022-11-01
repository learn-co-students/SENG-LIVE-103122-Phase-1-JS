//BookStore has been moved to data.js 
console.log(bookStore);

function priceFormatter(priceNum) {
  // return `$${priceNum.toFixed(2)}`;
  return '$' + priceNum.toFixed(2);
}

// create a function renderHeader() that takes the store name from bookStore and adds to the DOM
function renderHeader(bookStore) {
  document.querySelector('header h1').textContent = bookStore.name
}

renderHeader(bookStore);

// create a function renderFooter() that takes the store address from bookStore and adds to the DOM

function renderFooter(bookStore) {
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#store').textContent = bookStore.location;
}

renderFooter(bookStore);


// DOM Manipulation workflows:

// Type #1

// We have an existing element on the page (html document) and we want to modify its content

// - query the dom to get the desired element
// - modify it using textContent = or src = etc.
// examples are renderHeader and renderFooter

// Type #2

// We want to create a new element and then add it to the page (DOM)

// - create a new element using document.createElement()
// - populate the element with children/content
// - add the element to an existing element within the DOM

// example is renderBook

// create a function called renderBook(book)
// it will take a book object as an argument
// and create the html struture for rendering 
// that book and insert it into our webpage!

function renderBook(book) {
  // should create an li element that looks something like this:
  // <li class="list-li">
  //   <h3>Eloquent JavaScript</h3>
  //   <p>Marjin Haverbeke</p>
  //   <p>$10.00</p>
  //   <img src="https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg" alt="Eloquent JavaScript cover"/>
  // </li>
  const li = document.createElement('li');
  li.className = "list-li";

  const h3 = document.createElement('h3');
  h3.textContent = book.title;

  const pAuthor = document.createElement('p');
  pAuthor.textContent = book.author;
  
  const pPrice = document.createElement('p');
  pPrice.textContent = priceFormatter(book.price);

  const img = document.createElement('img');
  img.src = book.imageUrl;
  img.alt = `${book.title} book cover`;
  
  li.append(h3, pAuthor, pPrice, img);
  document.querySelector("#book-list").append(li)
}
// for testing purposes:
// const book = bookStore.inventory[0]
// renderBook(book);

bookStore.inventory.forEach(book => {
  renderBook(book);
})

// 4 key methods to remember:

// document.querySelector()
// document.createElement()
// element.textContent = // others to manipulate other attributes like hrefs or src on links and images
// element.append()