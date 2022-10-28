document.addEventListener('DOMContentLoaded', () => {

    // Fetch requests 
//* Create GET request 
        // fetch('http://localhost:3000/stores/1')
        // .then(res => res.json)
        // .then(store => {
        //     renderHeader(store)
        //     renderFooter(store)
        // })
        // .catch(e => console.error(e))

        // fetch('http://localhost:3000/books')
        // .then(res => res.json)
        // .then(books => books.forEach(renderBookCard))
        // .catch(e => console.error(e))

//* Refactor to be more dynamic pt.1
        // Function for making a GET request 
        function fetchResource(url){
            return fetch(url)
            .then(res => res.json())
        }
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
    
        function renderBookCard(cardData) {
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
    
            //Event Listeners 
            btn.addEventListener('click',()=>li.remove())
        
            li.append(h3,pAuthor,pPrice,img,btn)
            document.querySelector('#book-list').append(li)
        }
    
    // Event Handlers
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
    
    
    // Invoking functions 
//* Refactor to be more dynamic pt.2   
        fetchResource('http://localhost:3000/stores/1')
        .then(store => {
            renderHeader(store)
            renderFooter(store)
        })
        .catch(e => console.error(e))
    
        fetchResource('http://localhost:3000/books')
        .then(books => books.forEach(renderBookCard))
        .catch(e => console.error(e))
    
        document.querySelector('#book-form').addEventListener('submit', handleForm)
    
    })

/* 
Second example if needed for GET:
1. Create a fetch request that fetches all stores
2. Create a ul with a class name of store-menu.
3. Create an li for each store that's appended to the ul. The li's text content should be the store name and it should have an id with the stores id.

bonus practice with events
4. Add an eventListener for click to each li.
5. The listener should change the header and footer to the information to match the store that was selected. 
    - You can do this without an additional fetch but if you'd like to demo fetch again make a fetch call for the specific store information. 

*/