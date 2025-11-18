// 1. Get references to the HTML elements using their IDs
const button = document.getElementById('myButton');
const message = document.getElementById('message');

// 2. Define the function to run when the button is clicked
function changeText() {
    message.textContent = "🥳 Success! The separate script.js file changed this text.";
    button.textContent = "Checked!";
}

// 3. Attach the function to the button's 'click' event
button.addEventListener('click', changeText);