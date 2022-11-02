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

# 📅 Events 📅

---

### Lecture Goals

- Explain the importance of event handling in modern web applications
- Explain how callback functions are used with event listeners
- Observe how to add a form to a webpage using HTML and JavaScript
- Observe how onSubmit events are used to receive information from Users via forms
- Explain the purpose of .preventDefault() method
- Use MDN to discover and interact with JavaScript events


---

<img 
  src="./data-display-behavior.drawio.svg" 
  alt="Data Display and Behavior" 
  style="width: 85%" 
/>

---

<img 
  src="./data-display-behavior-with-events.drawio.svg"  
  alt="Data Display and Behavior with Events" 
  style="width: 85%" 
/>

---

<img 
  src="./event-handling-1.drawio.svg"  
  alt="Handling Events part 1 (setup)" 
  style="width: 85%" 
/>

---

<img 
  src="./event-handling-2.drawio.svg"  
  alt="Handling Events part 2 (in action)" 
  style="width: 85%" 
/>

---

<img 
  src="./anatomy-of-an-event-listener.drawio.svg"  
  alt="Anatomy of an event listener diagram" 
  style="width: 90%" 
/>

---

## The Click Event

<button id="clickme" style="padding: 1.5rem 2rem; font-size: 2rem;">Click Me!</button>

<script>
function handleClick() {
  alert('Thanks! :)');
}
const button = document.getElementById('clickme');
button.addEventListener('click', handleClick);
</script>

<pre><code data-line-numbers><button id="clickme" style="padding: 1.5rem 2rem; font-size: 2rem;">Click Me!</button>

<script>
function handleClick() {
  alert('Thanks! :)');
}
const button = document.getElementById('clickme');
button.addEventListener('click', handleClick);
</script></code></pre>

- Why would `addEventListener` be considered a higher order function?
- In which case is `handleClick` behaving as an event handler? Line 4 or line 8? Why?

---

## The Submit Event

<form>
  <input type="text" name="q" />
  <input type="submit" />
</form>

<script>
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  console.log(form.q);
});
</script>

<pre><code data-line-numbers><form>
  <input type="text" name="q" />
  <input type="submit">Search</input>
</form>

<script>
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  console.log(form.q);
}));
</script></code></pre>

---

## The Submit Event (with preventDefault)

<form id="otherForm">
  <input type="text" name="q" />
  <input type="submit" />
</form>

<script>
const otherForm = document.querySelector('#otherForm');
otherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(otherForm.q.value);
});
</script>

<pre><code data-line-numbers><form>
  <input type="text" name="q" />
  <input type="submit">Search</input>
</form>

<script>
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  console.log(form.q);
}));
</script></code></pre>

---

## Let's Code!

- Users should be able to delete books by clicking the delete button at the bottom of the book card
- Users should be able to add a book by filling in the form at the top of the page (the book they add should appear in the DOM)