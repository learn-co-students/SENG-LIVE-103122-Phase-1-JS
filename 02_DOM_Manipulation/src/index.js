//BookStore has been moved to data.js 


//* Create a function that uses a selector to get the header and add the bookStore name as its text content
// Renders Header
function renderHeader(){
    document.querySelector('h1').textContent = bookStore.name
}

//* Create a function that grabs all the divs form the footer and add the book store name, address, hours and/or phone number
// Renders Footer
function renderFooter(){
    const footerDivs = document.querySelectorAll('footer div')
    footerDivs[0].textContent = bookStore.name
    footerDivs[1].textContent = bookStore.address
    footerDivs[2].textContent = bookStore.hours
}

//* 1. use a forEach to iterate over BookStore inventory.
//  2. Pass the forEach an anonymous callback that takes the inventory data and creates an li, with an h3 tag, 2 p tags, and image tag.
// 3. Add the cardData content to the tags.
// 4. Append li to the DOM through the ul with the id of book-list

// bookStore.inventory.forEach((cardData) => {
//     const li = document.createElement('li')
//     const h3 = document.createElement('h3')
//     const pAuthor = document.createElement('p')
//     const pPrice = document.createElement('p')
//     const img = document.createElement('img')
//     const btn = document.createElement('button')

//     h3.textContent = cardData.title
//     pAuthor.textContent = cardData.author
//     pPrice.textContent = `$${cardData.price}`
//     btn.textContent = 'Delete'

//     img.src = cardData.imageUrl
//     li.className = 'list-li'

//     li.append(h3,pAuthor,pPrice,img,btn)
//     document.querySelector('#book-list').append(li)
// })


//* Refactor to make the anonymous callback its own function so it can be reused later. 

const renderBookCard = (cardData) => {
    const li = document.createElement('li')
    const h3 = document.createElement('h3')
    const pAuthor = document.createElement('p')
    const pPrice = document.createElement('p')
    const img = document.createElement('img')
    const btn = document.createElement('button')

    h3.textContent = cardData.title
    pAuthor.textContent = cardData.author
    pPrice.textContent = `$${cardData.price}`
    btn.textContent = 'Delete'

    img.src = cardData.imageUrl
    li.className = 'list-li'

    li.append(h3,pAuthor,pPrice,img,btn)
    document.querySelector('#book-list').append(li)
}

//* Organize functions calls
renderHeader()
renderFooter()
bookStore.inventory.forEach(renderBookCard)



