console.log(apiKEY)
// fetch('https://pokeapi.co/api/v2/pokemon/mewtwo/')
// .then(res => res.json())
// .then(data =>  {
//     debugger
//     console.log(data.name)
// })


document.addEventListener('DOMContentLoaded', () => {
    // Fetch requests 
        // Function for making a GET request 
        function fetchResource(url){
            return fetch(url)
            .then(res => res.json())
        }

        function createResources(url, body){
            return fetch(url,{
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            })
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
            createResources('http://localhost:3000/books', book)
            .then(renderBookCard)
            .catch(e => console.error(e))

        }

        function handleRenderSearch(){
            document.querySelector('main').innerHTML = `
            <form id="api-Search">
                <label>API Search<label>
                <input type="text" name="search"></input>
                <input type="submit"></input>
            </form>
            `

            document.querySelector('#api-search').addEventListener('submit', handleAPIQuery)
        }
        //Handles Google Books API search
        function handleAPIQuery(e){
            e.preventDefault()
            const search = e.target.search.value
            console.log(search)

            fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=20&key=${apiKEY}`)
            .then(res => res.json())
            .then(apiBooks => {
 
            
                apiBooks.items.forEach(book => {
                
                    //book.volumeInfo.title
                    //book.volumeInfo.author -> is an array
                    //book.volumeInfo.description
                    //console.log(book)
                    const div = document.createElement('div')
                    const h3 = document.createElement('h3')
                    const h4 = document.createElement('h4')
                    const p = document.createElement('p')
                    
                    h3.textContent = book.volumeInfo.title
                    
                    if(book.volumeInfo.authors) h4.textContent = book.volumeInfo.authors.join(' and ')
                    p.textContent = book.volumeInfo.description

                    div.className = "search-list"
               
                    div.append(h3,h4,p)
                   
                    document.querySelector('main').append(div)

                })
            })
       
            
        }

    
    
    // Invoking functions    
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
        document.querySelector('#nav-search').addEventListener('click', handleRenderSearch)
})