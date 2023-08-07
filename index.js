let modeText = document.querySelector('#mode-text');
let modeIcon = document.querySelector('.icon-container');
let profileContent = document.querySelector('.profile-content');
let userName = document.querySelector('#name');
let avatar = document.querySelector('#avatar');
let userId = document.querySelector('#user');
let repos = document.querySelector('#repos');
let followers = document.querySelector('#followers');
let following = document.querySelector('#following');
let buttonContainer = document.querySelector('.button-container');
let app = document.querySelector('.app')

modeText.addEventListener('click',() => {
    profileContent.classList.toggle("dark-mode");
    modeText.innerText = modeText.innerText=="DARK" ? "LIGHT" : "DARK";
    app.classList.toggle("dark-mode");

});


modeIcon.addEventListener('click',() => {
  app.classList.toggle("dark-mode");
  profileContent.classList.toggle("dark-mode");
});

let input = document.querySelector('#input');
let submit = document.querySelector('#submit');
submit.addEventListener('click',() => {
    searchFollowers(input.value);
    searchUserName(input.value);
});
input.addEventListener('keydown',(event) => {
    if(event.keyCode === 13){
      searchFollowers(input.value);
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
          console.log(data);
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
    avatar.src = data?.avatar_url;
    userId.innerHTML = data.login;
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
clearButton.style.display = 'none';

// Append the clear button to the input container
searchBarConatiner.appendChild(clearButton);
buttonContainer.appendChild(clearButton);

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







 // Replace '{value}' with the desired GitHub username

const container = document.getElementById('userContainer');
const headingContainer = document.getElementById('headingContainer');

const heading = document.createElement('h1');
heading.innerText = 'Followers List';

function createCard(userData) {
  const card = document.createElement('div');
  card.classList.add('user-card');

  const avatar = document.createElement('img');
  avatar.classList.add('user-avatar');
  avatar.src = userData.avatar_url;
  avatar.alt = userData.login;

  const login = document.createElement('div');
  login.classList.add('user-login');
  login.textContent = userData.login;
  console.log(userData.login);

  const link = document.createElement('a');
  link.classList.add('user-link');
  link.style.textDecoration = 'none';
  link.href = userData.html_url;
  link.target = '_blank';
  link.textContent = 'Visit Profile';

  card.appendChild(avatar);
  card.appendChild(login);
  card.appendChild(link);
  container.appendChild(card);
}

// Fetch followers data from GitHub API

async function searchFollowers (value){

  await fetch(`https://api.github.com/users/${value}/followers`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Loop through the followersData array and create a card for each follower
    console.log(data);
    container.innerHTML = '';
    
    headingContainer.appendChild(heading)
    
    data.forEach(follower => createCard(follower));
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}
  