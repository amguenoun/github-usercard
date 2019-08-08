/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const cards = document.querySelector('.cards');

const calendar = document.querySelector('.calendar');
calendar.classList.add("calendar-hide");
const calendarBtn = document.createElement('button');
calendarBtn.textContent = "Change Calendar View";
calendarBtn.style.margin = "0 39%";
cards.appendChild(calendarBtn);

calendarBtn.addEventListener('click', () => {
  calendar.classList.toggle("calendar-hide");
})

const subBtn = document.querySelector(".subButton");
const subForm = document.querySelector(".userInput");


subBtn.addEventListener('click', () => {
  const cardsList = document.querySelectorAll(".card");
  if (cardsList.length > 0) {
    cardsList.forEach((item) => {
      item.remove();
    })
  }
  let inputName = subForm.value;
  let finalValue = "https://api.github.com/users/" + inputName;
  axios.get(finalValue)
    .then(response => {
      createCard(response.data);
      axios.get(response.data.followers_url)
        .then(secondResponse => {
          secondResponse.data.forEach(item => {
            axios.get(item.url)
              .then(thirdResponse => {
                createCard(thirdResponse.data);
              })
              .catch(err => {
                console.log(err);
              });
          })
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
})



/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/


function createCard(object) {
  //Creating Elements
  const card = document.createElement('div');
  const cardImage = document.createElement('img');
  const cardInfo = document.createElement('div');
  const cardName = document.createElement('h3')
  const cardUserName = document.createElement('p');
  const cardLocation = document.createElement('p');
  const cardProfile = document.createElement('p');
  const cardLink = document.createElement('a');
  const cardFollowers = document.createElement('p');
  const cardFollowing = document.createElement('p');
  const cardBio = document.createElement('p');

  //Assign Classes
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  cardName.classList.add('name');
  cardUserName.classList.add('username');

  cardProfile.textContent = 'Profile: '; //Need to be moved up to prevent overwritting anchor tag

  //Creating Layout
  cards.appendChild(card);
  card.appendChild(cardImage);
  card.appendChild(cardInfo);
  cardInfo.appendChild(cardName);
  cardInfo.appendChild(cardUserName);
  cardInfo.appendChild(cardLocation);
  cardInfo.appendChild(cardProfile);
  cardProfile.appendChild(cardLink);
  cardInfo.appendChild(cardFollowers);
  cardInfo.appendChild(cardFollowing);
  cardInfo.appendChild(cardBio);

  //Assign Content
  cardImage.src = object.avatar_url;
  cardName.textContent = object.name;
  cardUserName.textContent = object.login;
  cardLocation.textContent = `Location: ${object.location}`;
  cardLink.href = object.html_url;
  cardLink.textContent = object.html_url;
  cardFollowers.textContent = `Followers: ${object.followers}`;
  cardFollowing.textContent = `Following: ${object.following}`;
  cardBio.textContent = `Bio: ${object.bio}`;
}

/* Step 4: Pass the data received from Github into your function,
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either
          follow this link in your browser https://api.github.com/users/<Your github name>/followers
          , manually find some other users' github handles, or use the list found
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.

          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = ["tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];
// followersArray.forEach(item => {
//   axios.get("https://api.github.com/users/" + item)
//     .then(response => {
//       createCard(response.data);
//     })
//     .catch(err => {
//       console.log(err);
//     })
// });

