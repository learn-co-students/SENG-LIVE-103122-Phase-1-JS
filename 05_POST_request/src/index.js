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
  const form = document.querySelector('#book-form');
  // this is what a book looks like
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


// Invoking functions    
  // fetching our data!
  fetch('http://localhost:3000/stores/1')
    .then((response) => response.json())
    .then((bookStore) => {
      renderHeader(bookStore)
      renderFooter(bookStore)
      console.log(bookStore)
    });
  
  
  fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(booksData => {
      booksData.forEach(renderBook)
    })
    .catch((error) => {
      console.error(error);
      console.log("Did you remember to start your JSON server?")
    })

})