//Data 
const inventory = [
  {
    id:1,
    title: 'Eloquent JavaScript: A Modern Introduction to Programming',
    author: 'Marjin Haverbeke',
    price: 10.00,
    reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
    inventory: 10,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
  },
  {
    id:2,
    title: 'JavaScript & JQuery: Interactive Front-End Web Development',
    author: 'Jon Duckett',
    price: 45.75,
    reviews: [{userID: 15, content:'good way to learn JQuery'}],
    inventory: 2,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/31SRWF+LkKL._SX398_BO1,204,203,200_.jpg'
  },
  {
    id:3,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    price: 36.00,
    reviews: [{userID: 25, content:'I disagree with everything in this book'}, {userID: 250, content:'Only JS book anyone needs'}],
    inventory: 8,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
  },
  {
    id:4,
    title: 'JavaScript: The Definitive Guide',
    author: 'David Flanagan',
    price: 25.50,
    reviews: [{userID: 44, content:'Great intro to js book'}, {userID: 350, content:'It really is the Definitive guide'}],
    inventory: 0,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51wijnc-Y8L._SX379_BO1,204,203,200_.jpg"
  },
  {
    id:5,
    title: 'You Don’t Know JS',
    author: 'Kyle Simpson',
    price: 6.00,
    reviews: [{userID: 76, content:'You can find this for free online, no need to pay for it!'}],
    inventory: 7,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41T5H8u7fUL._SX331_BO1,204,203,200_.jpg'
  }, 
  {
    id:6,
    title: 'Learn Enough JavaScript to Be Dangerous',
    author: 'Michael Hartl',
    price: 24.00,
    reviews: [{userID: 50, content:'pretty good'}],
    inventory: 5,
    imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQyf6xSyTHc7a8mx17ikh6GeTohc88Hn0UgkN-RNF-h4iOwVlkW'
  },
  {
    id:7,
    title: 'Cracking the Coding Interview',
    author: 'Gayle Laakmann McDowell',
    price: 49.95,
    reviews: [{userID: 99, content:'One of the most helpful books for taking on the tech interview'}, {userID:20, content: 'Great but I just wish it was in JavaScript instead of Java' }],
    inventory: 20,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41oYsXjLvZL._SY344_BO1,204,203,200_.jpg'
  }
]

// Function ideas:
/*
- helloWorld
- priceFormatter
- titleAndAuthor
- applyDiscount(price)
- randomDiscount
- generateMarketing(book)
- buildBook(price, author, imageUrl)
*/

// Arrow functions vs regular functions



// Difference between Block scope, Function scope, and Global scope



// Ideas: 

console.log("hello world")


function greet(firstName) {
  // debugger;
  console.log(`Hi ${firstName}, welcome to phase 1, JS!`);
}

// const name = "Hanna"
const otherName = "Caylan"

greet("Mark");

// define a constant to work with one element in the array:

const globalBook = inventory[0];

// function declaration
function priceFormatter(priceNum) {
  // return `$${priceNum.toFixed(2)}`;
  return '$' + priceNum.toFixed(2);
}

// function invocation
const firstBookPrice = priceFormatter(globalBook.price);
console.log(firstBookPrice);

// arrow version of priceFormatter:

// // function declaration
// const priceFormatter = (priceNum) => '$' + priceNum.toFixed(2);

// // function invocation
// console.log(priceFormatter(book.price));

// using arrow function syntax for callbacks is cleaner:
// inventory.forEach(element => console.log(element))

// vs

// inventory.forEach(function(element){ console.log(element)})

// // callbacks can be declared separately and then passed to a higher order function like map

// const callback = (book) => {
//   return priceFormatter(book.price)
// }

// console.log(inventory.map(callback));

// // or we can just define an arrow function inline and pass it as an argument to map

const formattedBooks = inventory.map(bookObj => {
  let price = priceFormatter(bookObj.price);
  let author = bookObj.author;
  let title = bookObj.title;
  // return "Eloquent JavaScript by Martin Haverbeke is on sale for $10.00"
  return `${title} by ${author} is on sale for ${price}`;
})

console.log(formattedBooks);

const simplifiedBookObjects = inventory.map(bookObj => {
  return {
    price: priceFormatter(bookObj.price),
    author: bookObj.author,
    title: bookObj.title
  }
})

console.log(simplifiedBookObjects);