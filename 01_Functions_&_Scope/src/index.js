//Data 
const inventory = [
        {
            id:1,
            title: 'Eloquent JavaScript: A Modern Introduction to Programming',
            author: 'Marjin Haverbeke',
            price: 10.00,
            reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
            inventory: 10,
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
            
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
            imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg',
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

// Function Declaration 


//* Declaration a function. 
// function helloWorld(){
//     console.log('hello world!')
// }


//* Declaration a function with a parameter and return
//* In this example I created one called priceFormatter that takes a price and formats it to currency.

//* Call the function above the Declaration to demo Hoisting
// priceFormatter(inventory[0].price)
function priceFormatter(book){
    // Price is a parameter, a variable used to pass values into a function. 
    return `$ ${book.price.toFixed(2)}`
    // return will end our function and it an output value. 
}

//* Call the function and pass it an argument
priceFormatter(inventory[0])



//Function Expression
//* Create an anonymous function and set it to a variable
const titleAndAuthor = function(book){
    return `Title: ${book.title} by ${book.author}`
}

titleAndAuthor(inventory[0])

//Arrow functions 

//* Create an arrow function with one parameter
// const printAdd = (title) => {
//     return `${book.title} by ${book.author} is on sale!`
// }
//* Refactor 
const printAdd = book => `${book.title} by ${book.author} is on sale!`
printAdd(inventory[0])
//* Create an arrow function with two parameters
const discountPrice = (discount, book) => Math.floor(book.price/discount)

discountPrice(2, inventory[0])


//* Demo scope 
//Global
const newTitle = 'The JavaScript Cookbook'

function buildBook(title, price, author, imageUrl){
    // Function scope
    // Variables inside a function become local 
    const bookObj = {}
    bookObj.title = title
    bookObj.price = price
    bookObj.author = author
    bookObj.inventory = 0
    bookObj.reviews = []

    if(!imageUrl){
        //Block Scope
        const defaultImage = 'placeHolderImage.jpg'
        bookObj.imageUrl = defaultImage    
    } else {
        bookObj.imageUrl = imageUrl
    }
    return bookObj
}
inventory.push(buildBook(newTitle, 32, 'Shelly Powers', false))



//* Demo callbacks 
function mapOverArray(bookArray, cb){
    const newArray = []
    for(let book of bookArray){
        newArray.push(cb(book))
    }
    return newArray
}

console.log(imapOverArray(inventory, (book) => book.title))
console.log(mapOverArray(inventory, (book) => book.author))

console.log(mapOverArray(inventory, titleAndAuthor))
console.log(mapOverArray(inventory, priceFormatter))



