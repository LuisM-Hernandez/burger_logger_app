// Make sure we wait to attach our handlers until the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', (event) => {
  if (event) {
    console.info('DOM loaded');
  }

  // UPDATE
  const changeBurgersBtn = document.querySelectorAll('.change-burger');


  // Set up the event listener for the create button
  if (changeBurgersBtn) {
    changeBurgersBtn.forEach((button) => {
      button.addEventListener('click', (e) => {
        console.log('test');
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');
        const newBurger = e.target.getAttribute('data-newburger');

        const newBurgerState = {
          eaten: newBurger,
        };

        fetch(`/api/burgers/${id}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          // make sure to serialize the JSON body
          body: JSON.stringify(newBurgerState),
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`changed eaten to: ${newBurger}`);
            location.reload('/');
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  }

  // CREATE
  const createBurgerBtn = document.getElementById('create-form');

  if (createBurgerBtn) {
    createBurgerBtn.addEventListener('submit', (e) => {
      e.preventDefault();

      // Grabs the value of the textarea that goes by the name, "quote"
      const newBurger = {
        name: document.getElementById('ca').value.trim(),
        eaten: document.getElementById('eaten').checked,
      };

      // Send POST request to create a new quote
      fetch('/api/burgers', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },

        // make sure to serialize the JSON body
        body: JSON.stringify(newBurger),
      }).then(() => {
        // Empty the form
        document.getElementById('ca').value = '';

        // Reload the page so the user can see the new quote
        console.log('Created a new burger!');
        location.reload();
      });
    });
  }

  const deleteBurger = document.querySelectorAll('.delete-burger');

  // Set up the event listener for the delete button
  if (deleteBurger) {
    deleteBurger.forEach((button) => {
      button.addEventListener('click', (e) => {
        console.log('test');
        // Grabs the id of the element that goes by the name, "id"
        const id = e.target.getAttribute('data-id');

        fetch(`/api/burgers/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },

          // make sure to serialize the JSON body
        }).then((response) => {
          // Check that the response is all good
          // Reload the page so the user can see the new quote
          if (response.ok) {
            console.log(`Deleted burger: ${id}`);
            location.reload('/');
          } else {
            alert('something went wrong!');
          }
        });
      });
    });
  }
});
