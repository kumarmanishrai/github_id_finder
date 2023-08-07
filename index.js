let modeText = document.querySelector('#mode-text');
let modeIcon = document.querySelector('.icon-container');
let profileContent = document.querySelector('.profile-content');
let userName = document.querySelector('#name');
let userId = document.querySelector('#user');
let repos = document.querySelector('#repos');
let followers = document.querySelector('#followers');
let following = document.querySelector('#following');
modeText.addEventListener('click',() => {
    profileContent.classList.add("dark-mode");
});


modeIcon.addEventListener('click',() => {
    profileContent.classList.toggle("dark-mode");
});

let input = document.querySelector('#input');
let submit = document.querySelector('#submit');
submit.addEventListener('click',() => {
    searchUserName(input.value);
});
input.addEventListener('keydown',(event) => {
    if(event.keyCode === 13){
        searchUserName(input.value);
    }
})


// searching for the username gitbub id

async function searchUserName(value){
    try {
        const response = await fetch(`https://api.github.com/users/${value}`);
        
        // Check if the response status code indicates success (200) or not found (404)
        if (response.status === 200) {
          const data = await response.json();
          renderData(data);
        } else if (response.status === 404) {
          console.log('User not found');
        } else {
          console.log('Unknown error occurred');
        }
      } catch (error) {
        console.log('Error occurred:', error);
      }
    // try{
    //     let response = await fetch(`https://api.github.com/users/${value}`);
    //     let data = await response.json();
    //     if(data === undefined){
    //         console.log('undefined');
    //     }
    //     renderData(data);
    //     console.log(data);
    // }catch(error){
    //     alert("error occured");
    // }
}



function renderData(data){
    userName.innerHTML = data?.name;
    userId.innerHTML = `@${userName.innerHTML}`;
    userId.href = data?.html_url;
    repos.innerHTML = data?.public_repos;
    followers.innerHTML = data?.followers;
    following.innerHTML = data?.following;
}


const searchBarConatiner = document.querySelector('.searchbar-container');


// Create the clear button dynamically
const clearButton = document.createElement('button');
clearButton.setAttribute('class', 'clear-button');
clearButton.setAttribute('type', 'button');
clearButton.textContent = 'X';

// Append the clear button to the input container
searchBarConatiner.appendChild(clearButton);

// Show the clear button when the input field is not empty
input.addEventListener('input', function() {
  if (input.value.trim() !== '') {
    clearButton.style.display = 'block';
  } else {
    clearButton.style.display = 'none';
  }
});

// Function to clear the input field
clearButton.addEventListener('click', function() {
  input.value = '';
  clearButton.style.display = 'none';
});







