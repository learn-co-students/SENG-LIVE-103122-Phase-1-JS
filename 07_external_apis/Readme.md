# Full CRUD Requests
## SWBAT
- [ ] Explain what an API is
- [ ] Explain the limitations of working with an external API
- [ ] Observe how to parse API documentation
- [ ]Observe how to send a GET request to an external API with / without an API key


## Deliverables 
- Demo requesting data from an external API that does not require a API key
    - Review the pokeAPI documentation 
    - Create a fetch request to one of its endpoints and console.log the results. 
- Demo requesting data from an external API that requires an API key
    - Review the Google Books API documentation [using the api](https://developers.google.com/books/docs/v1/using)
    - Open the APIs & Services tab in the google API console and create a project.  
        - Add an API key on the credentials page
        - In the library tab enable the Books API 
    - Open the index.js file and create a fetch call in handleRenderSearch
        - URL: `https://www.googleapis.com/books/v1/volumes?q=${search}&key=api_key_here`
        - Review Query parameters. Here we are using q and key as prams
        - NOTE: DO NOT PUSH YOUR API KEY UP TO GITHUB; IT CAN BE STOLEN AND USED MALICIOUSLY 
            - Protect your keys but creating a .gitignore in the root directory 
            - create a keys.js to store your keys in and add a script file to index.html to load the keys 
            - add the file path to the .gitignore this will keep the file from being pushed to github. 
            - .env and Netlify both have alternatives for protecting your keys if you intend to host the project. 
        - Render the google books data to the DOM
    - DELETE API KEY BEFORE LECTURE ENDS 

### API
An API (Application Programming Interface) is a set of features and rules that exist inside a software program (the application) enabling interaction with it through software - as opposed to a human user interface. The API can be seen as a simple contract (the interface) between the application offering it and other items, such as third party software or hardware. 

In Web development, an API is generally a set of code features (e.g. methods, properties, events, and URLs) that a developer can use in their apps for interacting with components of a user's web browser, or other software/hardware on the user's computer, or third party websites and services.
- [MDN web docs](https://developer.mozilla.org/en-US/docs/Glossary/API)
        
APIs can fulfill a variety of functionality. We will be focusing on using external APIs to get data for our web applications. 

Accessing and using each API will vary. APIs are made by different organizations, people and companies. They have different rules and standards for their use; however, some consistency and patterns are shared between them. 

### Reading the Documentation
The only way to learn how to use APIs is to read their documentation. 
Look for:
- Introduction 
- Terms of use 
- Accessibility
- Domain 
- Endpoints
- Query Parameters 
- Example Response

You've already made requests to an API. Json-server is a fake RESTful API,  requests to external APIs don't differ much in their syntax. 

```
//Fetch to the pokeAPI
fetch('https://pokeapi.co/api/v2/pokemon/mewtwo/')
.then(res => res.json())
.then(console.log)
.catch(console.error)

```


### API keys

Some APIs use keys to control API access and to track how they are utilized.
Obtaining an API key will differ depending on the resource you're using. Some need to be registered, and others will request emails detailing the project. All APIs that require a key should have instructions listed in their documentation.
Here are the steps for getting a key from the Google Books API 

Google Books api:
    - Register the application using the Google API Console
    - Create credentials 
    - Add API to Library 
    - Add the key to the query parameter key=api_key_here

# IMPORTANT DO NOT PUSH YOUR API KEY TO GITHUB!
Accidently pushing API keys to GitHub makes them vulnerable to theft. When working with APIs, be sure to remove your key from your application before pushing it OR put the key in a folder that git will ignore. In this example, we have a keys.js on our local machine holding out API keys. Our .gitignore file has been given the path to keys.js, so it knows to ignore it. Once we begin hosting our applications, we will need to find another way to hide our API keys through tools like .env, but that is beyond the scope of this lecture. 


### Query Params
APIs will often have optional parameters that can be added to the request to help specify the response. 
What they are and how they are to be used should be listed in the APIs documentation though there are some consistent patterns across APIs.

Here are the Google Books query params for volumes

```
// This is the base URL for volumes. Each request will start with this.
// 'https://www.googleapis.com/books/v1/volumes'
// '?q=' signifies the start of the query. This will allow a search for volumes that contain a text string '?q=cats' will search for volumes that contain the string 'cats'
// '&key=api_key_here' API keys can be added at the end of the query
// This makes the full and final url
// 'https://www.googleapis.com/books/v1/volumes?q=cats&key=api_key_here'
```

