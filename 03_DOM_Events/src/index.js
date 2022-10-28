//* Add a eventListener to an element and log the event object. Do something simple as an example before integrating events to the application.
// document.querySelector('h1').addEventListener('click', (e) => console.log(e))

//* Add eventListener for DOMContentLoaded. Wrap all functionality in listener to change scope to from global to local.
document.addEventListener('DOMContentLoaded', () => {

    // Render Functions
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
    
        const renderBookCard = (cardData) => {
            const li = document.createElement('li')
            const h3 = document.createElement('h3')
            const pAuthor = document.createElement('p')
            const pPrice = document.createElement('p')
            const img = document.createElement('img')
//* Add Button
            const btn = document.createElement('button')
    
            h3.textContent = cardData.title
            pAuthor.textContent = cardData.author
            pPrice.textContent = `$${cardData.price}`
//* Set text content of button to 'delete'
            btn.textContent = 'Delete'
    
            img.src = cardData.imageUrl
            li.className = 'list-li'
//* Add eventListener to btn for click that removes the card when clicked. li can be removed or e.target.parentElement 
            //Event Listeners 
            btn.addEventListener('click',()=>li.remove())
        
            li.append(h3,pAuthor,pPrice,img,btn)
            document.querySelector('#book-list').append(li)
        }
    
    // Event handlers 
//* Add form handler that builds a new book and renders it dynamically using renderBookCard.
        function handleForm(e){
            e.preventDefault()
            //Builds Book
            const book = {
                title: e.target.title.value,
                author:e.target.author.value,
                price: e.target.price.value,
                imageUrl: e.target.imageUrl.value,
                inventory:e.target.inventory.value,
                reviews:[]
            }
            renderBookCard(book)
        }
    
    //Invoking functions
        renderHeader(bookStore)
        renderFooter(bookStore)
        bookStore.inventory.forEach(renderBookCard)
//* Add eventListener to form for submit that calls submit handler
        document.querySelector('#book-form').addEventListener('submit', handleForm)
    
    
    })

/* 
Second example if needed for Events:
1. Create a new store object with the same properties as BookStore.
2. Add a button that toggles the store information to a different store.
3. Add eventListener for click that toggles the store info in the header and footer to the new store object.
 
*/