// Handle click events on ramen images, updating the details displayed
const handleClick = (ramen) => {
  const detailImage = document.querySelector('#ramen-detail .detail-image');
  const detailName = document.querySelector('#ramen-detail .name');
  const detailRestaurant = document.querySelector('#ramen-detail .restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  // Set the content of detail elements based on clicked ramen
  detailImage.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};

// Attach a submit event listener to the new ramen form
const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const newRamen = {
      name: event.target.name.value,
      restaurant: event.target.restaurant.value,
      image: event.target.image.value,
      rating: event.target.rating.value,
      comment: event.target['new-comment'].value
    };

    // Add the new ramen to the menu
    addNewRamen(newRamen);
  });
};

// Fetch and display all ramen images from the server
const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const menuDiv = document.getElementById('ramen-menu');
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        menuDiv.appendChild(img);
      });
    })
    .catch(error => console.error('Error loading ramens:', error));
};

// Main function to initiate the application
const main = () => {
  displayRamens();
  addSubmitListener();
}

// Start the application
main();

// Function to add a new ramen image to the menu
const addNewRamen = (ramen) => {
  const menuDiv = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click', () => handleClick(ramen));
  menuDiv.appendChild(img);
};

// Export functions for possible testing or external usage
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};