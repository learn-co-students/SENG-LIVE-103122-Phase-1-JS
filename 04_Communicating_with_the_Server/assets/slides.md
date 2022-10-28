---
theme : "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: false
title: "VSCode Reveal intro"
height: 900
width: 1400
---


<style>
input {
  font-size: 2rem;
  padding: 1rem;
}
</style>

# Communicating with the Server

---

## Lecture Goals

- Explore the request-response cycle
- Review the differences between Server and Client
- List the different HTTP Verbs + corresponding actions
- Observe how to send GET requests using `.fetch()`
- Explain what Asynchronous means in JavaScript
- Explain why Promises are important in JavaScript
- Observe: 
  - Handling promises and errors using `.then()` and `.catch()`
  - Using json-server to create a local API
  - Rendering data to the browser window after a fetch request

---

<img 
  src="https://res.cloudinary.com/dlzuobe8h/image/upload/v1665765657/0fcu_rfxhIc1xpVWSdmHJ7rAK7c1QwpvQ-qdsELtbKMxQn4wcPUImXCYwfVm7DvNE_EZqKjf2eV6l66afriZaXFrIAXXujac0D7WYepFKbj3f824O7Z7eMZhWG_nkvOjrbeSXDZe9DzqLuPqfLXhNCAMZqmlZxnEv-oWUvbwH1Upr3szQnlG1R2unNyT_nw_zfgztd.png" 
  alt="Client and Server communication" 
  style="width: 100%;"
/>

<aside class="notes">

Client
- User interface
- Responsible for styling, layout, and event functionality
- Lightweight and loads fast
- Acts as a “template” for dynamic data 
- Makes requests to the server

Server
- Responsible for data storage and management
- Changes in data may be triggered by the client, but the actual change is handled by the server-side
- Sends a response back to the server

</aside>

---

### HTTP Protocol

<img 
  src="https://res.cloudinary.com/dlzuobe8h/image/upload/v1665768471/F6Syv8aUhBiQUoOvmg8QwNRZdxaTyBVwNFsUMpPlYyGm5kXZ1gjown9J43fHTs-oA96bnSpWpI4gX195G3RsyL_DhgliM_jBNXX-4RMjEPowwWjUW7DVjsGawwJIsRlB3BT1Z78uu3pOJZvPTeufjQE1v2lR6FFpWrqdHV6Dt2T4-uIwTZCOeHF2COK8_nw_qrzyp6.png" 
  alt="HTTP protocol for HTTP requests" 
  style="width: 80%;"
/>

<small>Image from [MDN's HTTP Overview](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)</small>

<aside class="notes">

HTTP is:
- Language protocol used to communicate between the server and client 
- Used for fetching resources
- Data exchange 
- Readable 
- Stateless 
- Has sessions

Open devtools in Chrome for the slideshow and demo the network tab.

</aside>

---

### HTTP Verbs & CRUD


Method | CRUD Action | Description
---------|----------|---------
 GET | READ | Retrieves resources
 POST | CREATE | Creates resources
 PUT/PATCH | UPDATE | Updates resources
 DELETE | DESTROY | Deletes resources


---

<iframe 
  src="https://http.cat/"
  style="width: 1500px; max-width: 100%; height: 900px; max-height: 60%"
></iframe>

---

### JSON (JavaScript Object Notation)

<img 
  src="https://res.cloudinary.com/dlzuobe8h/image/upload/v1665769374/l7GjO7D3eyP2fDOG1wv6bsiTPWAzeYTlYJk8mCWlCXFpyXbDGVtvezulzA7fQ1---9Vs5GKpPnfAoVjX-QeezNH87M6HHcbVb9NViYGEkMWakQDJBi0k69c5fKeBiBQck5PQup45-dlVsjlc4q8uFeG5tJACZ60nwJ7ywjRjyLg6Zcj7775mBYqAr6BE_nw_m4zhfz.png" 
  alt="JSON example" 
  style="width: 80%;"
/>

<aside class="notes">

JSON is:
- a lightweight data storage for data exchange 
- it works with any language 
- and it's easy to read

</aside>

---

## Mocking the server with 
## json-server

---

### Installation

```
npm install -g json-server
```

---

### Usage

- create a file at project root called db.json {.fragment}
- add an object to the db.json file {.fragment}
- each key in the object will be one of the resources you can request from the json-server {.fragment}
- run the server from your terminal: `json-server --watch db.json` {.fragment}

---


<div style="display: flex; flex-direction: row">
  <div style="width: 50%">
    
  ### Setup
    
  </div>
  <div style="width: 50%">

  ### Demo

  </div>
</div>

<div style="display: flex; flex-direction: row">
  <div style="width: 50%; display: flex; flex-direction: column; justify-content: center">

```json
{
  "posts": [
    { title: "JSON-server is really cool" },
    { title: "JSON-server allows you to mock an API server by creating a single file!"}
  ]
}
```

```bash
cd 04_Communicating_with_the_Server/assets
json-server --watch db.json
```

<img
  src="https://res.cloudinary.com/dlzuobe8h/image/upload/v1665769655/Screen_Shot_2022-10-14_at_10.22.25_AM_eqxe9c.png"
  alt="JSON server running in terminal"
/>
    
  </div>
  <div style="width: 50%; display: flex; flex-direction: column; justify-content: center">

  Visit <a href="http://localhost:3000/posts" target="_blank">http://localhost:3000/posts</a>

  <img
    src="https://res.cloudinary.com/dlzuobe8h/image/upload/v1665767313/Screen_Shot_2022-10-14_at_10.06.57_AM_rk6pgk.png"
    alt="json-server in action"
    style="width: 100%"
  />

  </div>
</div>

