---
theme : "night"
transition: "slide"
highlightTheme: "monokai"
slideNumber: false
title: "VSCode Reveal intro"
---

# Functions & Scope

---

#### Guidelines

<div style="display: flex; flex-direction: row">
  <div style="width: 30%">
    <div style='position:relative; padding-bottom:calc(75.00% + 44px)'><iframe src='https://gfycat.com/ifr/SafeGloriousIslandcanary' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div><p> <a href="https://gfycat.com/safegloriousislandcanary-international-man-of-mystery-austin-powers">via Gfycat</a></p>
  </div>
  <div style="width: 70%">

  - The more you participate the more you learn! 
  - Use Zoom's Raise Hand feature {.fragment}
  - Protect the Zoom chat! {.fragment}
  - 🤯 The moment you are confused, raise your hand. You're not alone! {.fragment}
  - "I don't know" is OK. Guessing is also OK! Mistakes => Learning! {.fragment}
  - 📷 on 🙏 {.fragment}


  </div>

</div>

---

#### Coding Along (not required!)

<div style="display: flex; flex-direction: row">
  <div style="width: 30%">
    <iframe src="https://giphy.com/embed/VTc0g9IKEpLAk" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/funny-everyone-VTc0g9IKEpLAk">via GIPHY</a></p>
  </div>
  <div style="width: 70%">

  - it can help
  - it can also hurt 😬 {.fragment}
  - If you get stuck, take a screenshot and refocus on our discussion {.fragment}
  - 💡Everything is recorded! {.fragment}
  - Focus on high level understanding > implementation {.fragment}
  - Comfort solving errors and fixing bugs will come with practice and experience {.fragment}


  </div>

</div>


---

<div style="font-size: 0.75em">

### My Setup

##### VSCode extensions:

Extension | Description |
---------|----------|
 [Draw.io Integation](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio) | for making diagrams from within VSCode 
 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) | for opening a webpage in the browser that will reload when the code is saved 
 [vscode-reveal](https://marketplace.visualstudio.com/items?itemName=evilz.vscode-reveal) | for opening the slide.md files in the browser to display slideshows
 [Tabnine AI Autocomplete](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode) | for code completion suggestions based on context

</div>

---

## Lecture Goals

- Describe what functions are
- Regular functions vs arrow functions syntax
- Explain the difference between:
  - Block scope
  - Function scope
  - Global scope
- Understand functions as first-class objects
- Identify higher-order functions
- Define callback functions and higher-order functions


---

## Functions

![functions](./functions.drawio.svg)


---

<div style="font-size: 0.75em">

### Let's Code!

Function | Parameters | Behavior
---------|----------|---------
 helloWorld | none | returns "Hello, world!"
 formatPrice | price (float) | returns the price like so: "$2.99" 
 titleAndAuthor | book (object) | returns a string containing both the title and author of the book

</div>

---

### () => {} vs function() {}

- syntax {.fragment}
- simplified vs fully featured {.fragment}
- interchangeable for now (hoisting! 😅) {.fragment}
- read more about [differences](https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/) (or feel free to bookmark for later) {.fragment}

---

#### Scope & The Scope Chain
![Scope and the Scope Chain](https://res.cloudinary.com/dlzuobe8h/image/upload/v1665447423/1_S9gu5XK8LBTSVddsGdBtGg_kq2mnh.png)

[Awesome Blog post on Scope and the Scope Chain](https://medium.com/joonsikyang/scope-and-the-scope-chain-27216a853a4e)

---

<div style="font-size: 0.75em">

### Links!


Resource | Location | Description
---------|----------|---------
 Starter Code | [GitHub Repo](https://github.com/learn-co-students/SENG-LIVE-101022-Phase-1-JS) | separate folder for each day's lecture contains the code and any related assets
 Recordings | [Google Sheet](https://docs.google.com/spreadsheets/d/139yeG9joHfaP8hT44z2iSLMv5ScLSc86ZKZ51csIfHo/edit#gid=0) | Links to the starter & solution code for each days video along with the video link and a notetaking doc you can use for practice 

</div>

---

## Resources

- [Differences between arrow functions and regular functions](https://dmitripavlutin.com/differences-between-arrow-and-regular-functions/)
- [Awesome Blog post on Scope and the Scope Chain](https://medium.com/joonsikyang/scope-and-the-scope-chain-27216a853a4e)