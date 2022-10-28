document.addEventListener('DOMContentLoaded', () => {

// Rendering functions
  // Renders Header
  function renderHeader(store){
    document.querySelector('h1').textContent = store.name
  }
  // Renders Footer
  function renderFooter(store){
    const footerDivs = document.querySelectorAll('footer div')
    footerDivs[0].textContent = store.name
    footerDivs[1].textContent = store.address
    footerDivs[2].textContent = store.hours
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

    const editStockInput = document.createElement("input");
    editStockInput.type = "number";
    editStockInput.style = "width: 45px";
    editStockInput.value = book.inventory;
    editStockInput.min = 0;

    editStockInput.addEventListener('change', (e) => {

      // pessimistic rendering (DOM update occurs after successful request)
      fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inventory: Number(editStockInput.value) })
      })
        .then(response => response.json())
        .then(book => {
          if (book.inventory === 0) {
            pStock.textContent = "Out of stock";
          } else if (book.inventory < 3) {
            pStock.textContent = "Only a few left!";
          } else {
            pStock.textContent = "In stock"
          }
        })
    })
    
    const img = document.createElement('img');
    img.src = book.imageUrl;
    img.alt = `${book.title} cover`;

    const btn = document.createElement('button');
    btn.textContent = 'Delete';

    btn.addEventListener('click', (e) => {
      if (window.confirm(`Are you sure you want to delete ${book.title}?`)) {
        li.remove();
        fetch(`http://localhost:3000/books/${book.id}`, { method: "DELETE" })
      }
    })

    li.append(h3,pAuthor,pPrice,pStock,editStockInput,img,btn);
    document.querySelector('#book-list').append(li);
  }

  function priceFormatter(price) {
      let formattedPrice = Number(price).toFixed(2);
      return `$${formattedPrice}`;
  }

// Event Handlers
  const bookForm = document.querySelector('#book-form');

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
     
    postJSON("http://localhost:3000/books", book)
      .then(book => {
        renderBook(book)
        e.target.reset();
      });  
  })


// Invoking functions    
  getJSON('http://localhost:3000/stores/1')
    .then(store => {
      renderHeader(store)
      renderFooter(store)
    })
    .catch(e => console.error(e))

  getJSON('http://localhost:3000/books')
    .then(books => books.forEach(renderBook))
    .catch(e => console.error(e))
})